export interface Step {
  id: string;
  type: 'click' | 'input' | 'navigation' | 'drag';
  timestamp: number;
  selector: string;
  text: string;
  description: string;
  position: { x: number; y: number };
  viewport: {
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
  };
  screenshotBefore: string; // base64 — state before the interaction
  screenshot: string;       // base64 — state after the interaction
  isSensitive: boolean;
}

export interface Recording {
  id: string;
  title: string;
  createdAt: number;
  steps: Step[];
}

export type RecordingState = 'idle' | 'recording' | 'stopped';

export interface Message {
  type: 'START_RECORDING' | 'STOP_RECORDING' | 'STEP_CAPTURED' | 'GET_STATE' | 'CAPTURE_SCREENSHOT';
  payload?: any;
}
