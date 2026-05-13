# TinDog - User Analytics Demo Site

A simple demo webpage (TinDog landing page) integrated with a comprehensive event tracking system. This site demonstrates real-world user interaction tracking for the CausalFunnel analytics platform.

## Overview

This is the **frontend demo application** that integrates the tracking script. Users visiting this page will have their interactions (page views and clicks) automatically tracked and sent to the analytics backend.

## Features

- **Automatic Event Tracking**: Tracks page views and click events automatically
- **Session Management**: Unique session IDs stored in localStorage
- **Click Coordinates**: Captures X/Y coordinates of all clicks for heatmap generation
- **Environment-Based Configuration**: API URL configured via environment variables (ideal for Vercel deployment)
- **Responsive Design**: Built with Bootstrap for mobile-friendly experience

## Tech Stack

- **Frontend**: HTML5, CSS3, Bootstrap 4
- **Tracking Library**: Vanilla JavaScript (no dependencies)
- **Event Transport**: Fetch API with JSON

## Project Structure

```
.
├── index.html              # Main landing page
├── css/
│   └── styles.css          # Custom styling
├── images/                 # Assets (dog images, iPhone mockup)
├── tracker/
│   └── tracker.js          # Event tracking script
├── build.js                # Build script for Vercel
├── vercel.json             # Vercel configuration
└── README.md               # This file
```

## Tracked Events

### 1. Page View
Fired when the page loads. Includes:
- `session_id`: Unique session identifier
- `event_type`: "page_view"
- `page_url`: Current page URL
- `timestamp`: Event timestamp

### 2. Click
Fired on every click on the page. Includes:
- `session_id`: Unique session identifier
- `event_type`: "click"
- `page_url`: Current page URL
- `x`: Horizontal click coordinate
- `y`: Vertical click coordinate
- `timestamp`: Event timestamp

## Setup & Deployment

### Local Development
1. Clone the repository
2. Update `tracker.js` API_URL to point to your local backend:
   ```javascript
   const API_URL = "http://localhost:5000/api/events";
   ```
3. Open `index.html` in a browser
4. Start interacting with the page to generate events

### Vercel Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variable in Vercel dashboard:
   - Name: `API_URL`
   - Value: `https://your-backend-url.com/api/events`
4. Deploy - the `build.js` script will automatically inject the API URL

## Assumptions & Trade-offs

| Aspect | Decision | Reason |
|--------|----------|--------|
| **Session Storage** | localStorage | Simple, persists across page reloads within same browser/device |
| **Click Tracking** | All clicks | Captures comprehensive user behavior; backend can filter later |
| **API Error Handling** | Silent failures | Non-blocking; prevents tracking from breaking user experience |
| **No Dependencies** | Vanilla JS | Minimal bundle size, zero external dependencies for tracking |
| **Hardcoded API URL** | Environment injection via build | Works with Vercel's build process seamlessly |

## Event Payload Example

```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "event_type": "click",
  "page_url": "https://tindog-demo.vercel.app",
  "x": 245,
  "y": 189,
  "timestamp": "2026-05-13T10:30:45.123Z"
}
```

## Integration with Analytics Backend

This demo site sends all events to the CausalFunnel analytics backend. The backend:
- Receives and stores events in MongoDB
- Provides APIs for querying sessions and events
- Generates heatmaps from click data
- Powers the analytics dashboard

See the main [CausalFunnel Analytics](../README.md) repository for full backend/dashboard setup.

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (including crypto.randomUUID)
- IE 11: ❌ Not supported (needs polyfills)

## Performance Notes

- Tracking is asynchronous and non-blocking
- Events are sent via HTTP POST without waiting for response
- Failed requests are logged but don't affect user experience
- Session ID generated once per browser/device