import { Step, Message } from './types';

let isRecording = false;
let steps: Step[] = [];

const DRAG_THRESHOLD = 6; // px

// ── Shared drag state ──────────────────────────────────────────────────────
let mouseDownEl: Element | null = null;
let mouseDownPos: { x: number; y: number } | null = null;
let mouseDownScreenshot = '';
let jsDragDetected = false;   // mousemove exceeded threshold
let nativeDragActive = false; // HTML5 dragstart fired

// ── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function getCssSelector(el: Element): string {
  if (el.id) return `#${el.id}`;
  const parts: string[] = [];
  let current: Element | null = el;
  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    if (current.className) {
      const classes = Array.from(current.classList).slice(0, 2).join('.');
      if (classes) selector += `.${classes}`;
    }
    parts.unshift(selector);
    current = current.parentElement;
  }
  return parts.join(' > ');
}

function getLabel(el: Element, text: string): string {
  return (
    el.getAttribute('aria-label') ||
    el.getAttribute('placeholder') ||
    text ||
    el.tagName.toLowerCase()
  );
}

function generateDescription(type: Step['type'], el: Element, text: string): string {
  const label = getLabel(el, text);
  if (type === 'click')      return `Click on "${label}"`;
  if (type === 'input')      return `Type "${text}" into ${label}`;
  if (type === 'navigation') return `Navigate to ${text}`;
  if (type === 'drag')       return `Drag "${label}"`;
  return `${type} on ${label}`;
}

function captureScreenshot(): Promise<string> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' }, (response) => {
      resolve(response?.screenshot || '');
    });
  });
}

function saveStep(
  type: Step['type'],
  el: Element,
  text: string,
  position: { x: number; y: number },
  screenshotBefore: string,
  screenshot: string,
): void {
  const isSensitive =
    el.getAttribute('type') === 'password' || el.getAttribute('data-sensitive') === 'true';

  const step: Step = {
    id: generateId(),
    type,
    timestamp: Date.now(),
    selector: getCssSelector(el),
    text: isSensitive ? '***' : text,
    description: generateDescription(type, el, isSensitive ? '***' : text),
    position,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    },
    screenshotBefore,
    screenshot,
    isSensitive,
  };

  steps.push(step);
  chrome.runtime.sendMessage({ type: 'STEP_CAPTURED', payload: step });
}

// ── Mouse drag (JS-based drag: React DnD, Sortable, etc.) ─────────────────

function handleMouseDown(e: MouseEvent): void {
  if (!isRecording || e.button !== 0) return;
  mouseDownEl      = e.target as Element;
  mouseDownPos     = { x: e.clientX, y: e.clientY };
  mouseDownScreenshot = '';
  jsDragDetected   = false;
  // Capture before state speculatively
  captureScreenshot().then(s => { mouseDownScreenshot = s; });
}

function handleMouseMove(e: MouseEvent): void {
  if (!isRecording || jsDragDetected || !mouseDownPos) return;
  const dx = e.clientX - mouseDownPos.x;
  const dy = e.clientY - mouseDownPos.y;
  if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
    jsDragDetected = true;
  }
}

async function handleMouseUp(_e: MouseEvent): Promise<void> {
  if (!isRecording) return;

  const wasDrag = jsDragDetected;
  const el      = mouseDownEl;
  const pos     = mouseDownPos;
  const before  = mouseDownScreenshot;

  // Reset state regardless
  mouseDownEl     = null;
  mouseDownPos    = null;
  jsDragDetected  = false;

  if (!wasDrag || !el || !pos || nativeDragActive) return;
  // nativeDragActive = HTML5 drag, handled by dragend instead

  await new Promise(r => setTimeout(r, 400));
  const after = await captureScreenshot();
  saveStep('drag', el, el.textContent?.trim() || '', pos, before, after);
}

// ── Native HTML5 drag (elements with draggable="true") ────────────────────

let nativeDragEl: Element | null = null;
let nativeDragPos: { x: number; y: number } | null = null;
let nativeDragBefore = '';

function handleDragStart(e: DragEvent): void {
  if (!isRecording) return;
  nativeDragActive = true;
  nativeDragEl     = e.target as Element;
  nativeDragPos    = { x: e.clientX, y: e.clientY };
  // Use whatever screenshot was already captured from mousedown, or grab a fresh one
  if (mouseDownScreenshot) {
    nativeDragBefore = mouseDownScreenshot;
  } else {
    captureScreenshot().then(s => { nativeDragBefore = s; });
  }
}

async function handleDragEnd(_e: DragEvent): Promise<void> {
  if (!isRecording || !nativeDragEl) return;

  const el     = nativeDragEl;
  const pos    = nativeDragPos!;
  const before = nativeDragBefore;

  nativeDragEl     = null;
  nativeDragPos    = null;
  nativeDragBefore = '';
  nativeDragActive = false;

  await new Promise(r => setTimeout(r, 400));
  const after = await captureScreenshot();
  saveStep('drag', el, el.textContent?.trim() || '', pos, before, after);
}

// ── Click ──────────────────────────────────────────────────────────────────

async function handleClick(e: MouseEvent): Promise<void> {
  if (!isRecording) return;
  // Ignore if a drag just ended (jsDragDetected was true during mouseup)
  // At this point jsDragDetected is already reset; use nativeDragActive as guard
  // For JS drags: browser typically doesn't fire click after significant movement, so this is safe
  if (nativeDragActive) return;

  const el     = e.target as Element;
  const before = await captureScreenshot();
  await new Promise(r => setTimeout(r, 400));
  const after  = await captureScreenshot();
  saveStep('click', el, el.textContent?.trim() || '', { x: e.clientX, y: e.clientY }, before, after);
}

// ── Input ──────────────────────────────────────────────────────────────────

let inputTimer: ReturnType<typeof setTimeout> | null = null;

function handleInput(e: Event): void {
  if (!isRecording) return;
  const el = e.target as HTMLInputElement;
  if (inputTimer) clearTimeout(inputTimer);
  inputTimer = setTimeout(async () => {
    const rect   = el.getBoundingClientRect();
    const pos    = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const before = await captureScreenshot();
    await new Promise(r => setTimeout(r, 200));
    const after  = await captureScreenshot();
    saveStep('input', el, el.value, pos, before, after);
  }, 800);
}

// ── Lifecycle ──────────────────────────────────────────────────────────────

function startRecording(): void {
  isRecording      = true;
  steps            = [];
  mouseDownEl      = null;
  mouseDownPos     = null;
  jsDragDetected   = false;
  nativeDragActive = false;
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('mouseup',   handleMouseUp,   true);
  document.addEventListener('click',     handleClick,     true);
  document.addEventListener('dragstart', handleDragStart, true);
  document.addEventListener('dragend',   handleDragEnd,   true);
  document.addEventListener('input',     handleInput,     true);
}

function stopRecording(): Step[] {
  isRecording = false;
  document.removeEventListener('mousedown', handleMouseDown, true);
  document.removeEventListener('mousemove', handleMouseMove, true);
  document.removeEventListener('mouseup',   handleMouseUp,   true);
  document.removeEventListener('click',     handleClick,     true);
  document.removeEventListener('dragstart', handleDragStart, true);
  document.removeEventListener('dragend',   handleDragEnd,   true);
  document.removeEventListener('input',     handleInput,     true);
  return steps;
}

chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  if (message.type === 'START_RECORDING') {
    startRecording();
    sendResponse({ ok: true });
  } else if (message.type === 'STOP_RECORDING') {
    sendResponse({ steps: stopRecording() });
  } else if (message.type === 'GET_STATE') {
    sendResponse({ isRecording, stepCount: steps.length });
  }
  return true;
});
