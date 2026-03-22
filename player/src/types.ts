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
  screenshotBefore?: string;
  screenshot: string;
  isSensitive: boolean;
}

export interface Recording {
  id: string;
  title: string;
  createdAt: number;
  steps: Step[];
}

export interface DemoMeta {
  id: string;
  title: string;
  createdAt: number;
  stepCount: number;
}
