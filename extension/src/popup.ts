let port = chrome.runtime.connect({ name: 'popup' });
let isRecording = false;
let savedId: string | null = null;

const dot = document.getElementById('dot')!;
const statusText = document.getElementById('status-text')!;
const stepCount = document.getElementById('step-count')!;
const mainBtn = document.getElementById('main-btn')!;
const titleInput = document.getElementById('title-input') as HTMLInputElement;
const savedMsg = document.getElementById('saved-msg')!;
const viewLink = document.getElementById('view-link')!;

port.onMessage.addListener((message) => {
  if (message.type === 'RECORDING_STARTED') {
    isRecording = true;
    updateUI();
  } else if (message.type === 'RECORDING_SAVED') {
    isRecording = false;
    savedId = message.payload.id;
    savedMsg.style.display = 'block';
    updateUI();
  } else if (message.type === 'STATE') {
    isRecording = message.payload.isRecording;
    if (message.payload.stepCount > 0) {
      stepCount.textContent = `${message.payload.stepCount} step${message.payload.stepCount !== 1 ? 's' : ''} captured`;
    }
    updateUI();
  }
});

function updateUI(): void {
  if (isRecording) {
    dot.classList.add('recording');
    statusText.textContent = 'Recording...';
    mainBtn.textContent = 'Stop Recording';
    mainBtn.className = 'btn-stop';
    titleInput.disabled = true;
  } else {
    dot.classList.remove('recording');
    statusText.textContent = 'Ready to record';
    mainBtn.textContent = 'Start Recording';
    mainBtn.className = 'btn-start';
    titleInput.disabled = false;
    stepCount.textContent = '';
  }
}

mainBtn.addEventListener('click', () => {
  if (isRecording) {
    port.postMessage({ type: 'STOP_RECORDING' });
  } else {
    savedMsg.style.display = 'none';
    port.postMessage({
      type: 'START_RECORDING',
      payload: { title: titleInput.value || undefined },
    });
  }
});

viewLink.addEventListener('click', () => {
  if (savedId) {
    chrome.tabs.create({ url: `http://localhost:5173/demo/${savedId}` });
  }
});

// Get initial state
port.postMessage({ type: 'GET_STATE' });
