import { Recording, Step } from './types';

const SERVER_URL = 'http://localhost:3005';

async function ensureContentScript(tabId: number): Promise<void> {
  try {
    await chrome.tabs.sendMessage(tabId, { type: 'GET_STATE' });
  } catch {
    await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
    // small delay for script to initialize
    await new Promise(r => setTimeout(r, 300));
  }
}

let currentRecording: Recording | null = null;
let activeTabId: number | null = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'STEP_CAPTURED') {
    if (currentRecording) {
      currentRecording.steps.push(message.payload as Step);
    }
    sendResponse({ ok: true });
  } else if (message.type === 'CAPTURE_SCREENSHOT') {
    // Use native tab capture — perfect quality, no transparency issues
    const windowId = sender.tab?.windowId ?? chrome.windows.WINDOW_ID_CURRENT;
    chrome.tabs.captureVisibleTab(windowId, { format: 'jpeg', quality: 90 }, (dataUrl) => {
      sendResponse({ screenshot: dataUrl || '' });
    });
    return true; // keep channel open for async response
  }
  return true;
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    port.onMessage.addListener(async (message) => {
      if (message.type === 'START_RECORDING') {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];
        if (!tab.id) return;
        activeTabId = tab.id;
        currentRecording = {
          id: Date.now().toString(),
          title: message.payload?.title || `Recording ${new Date().toLocaleString()}`,
          createdAt: Date.now(),
          steps: [],
        };
        await ensureContentScript(activeTabId);
        await chrome.tabs.sendMessage(activeTabId, { type: 'START_RECORDING' });
        port.postMessage({ type: 'RECORDING_STARTED', payload: { id: currentRecording.id } });
      } else if (message.type === 'STOP_RECORDING') {
        if (!activeTabId || !currentRecording) return;
        const response = await chrome.tabs.sendMessage(activeTabId, { type: 'STOP_RECORDING' });
        currentRecording.steps = response.steps || currentRecording.steps;

        // Save to server
        try {
          await fetch(`${SERVER_URL}/api/demos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentRecording),
          });
          port.postMessage({ type: 'RECORDING_SAVED', payload: { id: currentRecording.id } });
        } catch (e) {
          // Save locally as fallback
          port.postMessage({ type: 'RECORDING_SAVED', payload: { id: currentRecording.id, local: true } });
        }
        currentRecording = null;
        activeTabId = null;
      } else if (message.type === 'GET_STATE') {
        port.postMessage({
          type: 'STATE',
          payload: {
            isRecording: !!currentRecording,
            stepCount: currentRecording?.steps.length || 0,
            recordingId: currentRecording?.id,
          },
        });
      }
    });
  }
});
