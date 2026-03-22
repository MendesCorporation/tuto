# Tuto - Internal Demo Recording Tool

Tuto is an Arcade-like internal tool for recording and replaying interactive product demos. It consists of a Chrome extension that captures user interactions, a Node.js server that stores recordings, and a React player that plays them back with smooth animations.

## Architecture

```
tuto/
├── extension/          # Chrome Extension (Manifest V3)
│   ├── manifest.json   # Extension configuration
│   ├── src/
│   │   ├── types.ts    # Shared TypeScript types
│   │   ├── background.ts  # Service worker: manages recording state & saves to server
│   │   ├── content.ts  # Injected into pages: captures clicks, inputs, screenshots
│   │   ├── popup.ts    # Extension popup UI logic
│   │   └── popup.html  # Extension popup markup
│   ├── webpack.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── server/             # Node.js Express REST API (port 3001)
│   ├── src/
│   │   ├── index.ts    # Express app entry point
│   │   └── routes/
│   │       └── demos.ts  # CRUD routes for demo recordings
│   ├── tsconfig.json
│   └── package.json
│
├── player/             # React Player App (port 5173)
│   ├── src/
│   │   ├── main.tsx    # React entry point with routing
│   │   ├── App.tsx     # Demo gallery/listing page
│   │   ├── types.ts    # Shared TypeScript types
│   │   ├── pages/
│   │   │   └── DemoPage.tsx     # Demo viewer page
│   │   └── components/
│   │       ├── DemoPlayer.tsx   # Core player with animation
│   │       ├── PlayerControls.tsx  # Play/pause/seek controls
│   │       ├── CursorOverlay.tsx   # Animated cursor
│   │       ├── ClickHighlight.tsx  # Click ripple effect
│   │       └── StepDescription.tsx # Step caption overlay
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── data/               # JSON storage for recordings (auto-created)
```

## Data Flow

```
[Browser Tab] --click/input--> [content.ts]
                                    |
                              html2canvas screenshot
                                    |
                              [background.ts] <-- chrome.runtime.sendMessage
                                    |
                              POST /api/demos
                                    |
                              [server/demos.ts]
                                    |
                              data/{id}.json
                                    |
                         GET /api/demos/:id
                                    |
                              [player/DemoPage.tsx]
                                    |
                              [DemoPlayer.tsx] -- framer-motion animations
```

## Quick Start

### 1. Start the Server

```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:3001
```

### 2. Start the Player

```bash
cd player
npm install
npm run dev
# Player runs at http://localhost:5173
```

### 3. Build & Install the Extension

```bash
cd extension
npm install
npm run build
# Built files are in extension/dist/
```

Then in Chrome:
1. Open `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `extension/dist/` folder

## How to Record a Demo

1. Make sure the server is running (`npm run dev` in `/server`)
2. Click the **Tuto Recorder** extension icon in Chrome
3. (Optional) Enter a title for your recording
4. Click **Start Recording**
5. Interact with the web page — clicks and inputs are automatically captured
6. Click **Stop Recording** in the popup
7. Click **View demo →** to open the player

## How to View Demos

- Open `http://localhost:5173` to see all recorded demos
- Click any demo card to open the player
- Use arrow keys (`←` / `→`) or click controls to navigate steps
- Press **Space** to toggle autoplay
- Click the progress bar to jump to any step

## Player Features

- Smooth screenshot transitions with zoom-into-click animation (framer-motion)
- Animated cursor that moves between step positions
- Click ripple highlight effect at interaction point
- Step description overlay at the bottom
- Autoplay mode (3 seconds per step)
- Keyboard shortcuts: `Space` (play/pause), `←` (prev), `→` (next)
- Progress bar with step markers and click-to-seek

## API Reference

The server exposes a REST API at `http://localhost:3001`:

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/demos         | List all recordings      |
| GET    | /api/demos/:id     | Get a single recording   |
| POST   | /api/demos         | Save a new recording     |
| PATCH  | /api/demos/:id     | Update a recording title |
| DELETE | /api/demos/:id     | Delete a recording       |

## Example Recording JSON

```json
{
  "id": "1703001234567",
  "title": "Onboarding Flow Demo",
  "createdAt": 1703001234567,
  "steps": [
    {
      "id": "abc123xyz",
      "type": "click",
      "timestamp": 1703001235000,
      "selector": "#signup-button",
      "text": "Sign Up",
      "description": "Click on \"Sign Up\"",
      "position": { "x": 640, "y": 360 },
      "viewport": {
        "width": 1280,
        "height": 720,
        "scrollX": 0,
        "scrollY": 0
      },
      "screenshot": "data:image/jpeg;base64,...",
      "isSensitive": false
    },
    {
      "id": "def456uvw",
      "type": "input",
      "timestamp": 1703001237000,
      "selector": "form > input.email-field",
      "text": "user@example.com",
      "description": "Type \"user@example.com\" into Email",
      "position": { "x": 640, "y": 420 },
      "viewport": {
        "width": 1280,
        "height": 720,
        "scrollX": 0,
        "scrollY": 0
      },
      "screenshot": "data:image/jpeg;base64,...",
      "isSensitive": false
    }
  ]
}
```

## Sensitive Data

Password fields (`type="password"`) and elements with `data-sensitive="true"` are automatically masked — their captured text is replaced with `***` and the description is redacted.

## Notes

- Screenshots are captured using [html2canvas](https://html2canvas.hertzen.com/) bundled with the extension
- Recordings are stored as plain JSON files in the `data/` directory
- The player proxies `/api` requests to `http://localhost:3001` via Vite dev server
- The extension uses Manifest V3 with a service worker background script
