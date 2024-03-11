/src
│
├── /components
│   ├── /Navbar
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── /Logs
│   │   ├── Logs.jsx
│   │   ├── Logs.css
│   │   └── /components
│   │       ├── QuickSelections.jsx
│   │       ├── CustomTimeRangePicker.jsx
│   │       ├── LiveLogs.jsx
│   │       ├── InfiniteScroll.jsx
│   │       └── LogCount.jsx
│   │
│   ├── /Metrics
│   │   ├── Metrics.jsx
│   │   ├── Metrics.css
│   │   └── /components
│   │       ├── Charts.jsx
│   │       ├── Chart1.jsx
│   │       ├── Chart2.jsx
│   │       ├── Chart3.jsx
│   │       └── Chart4.jsx
│   │
│   └── /Common
│       ├── Chart.jsx
│       └── LoadingSpinner.jsx
│
├── /routes
│   ├── LogsRoute.jsx
│   ├── MetricsRoute.jsx
│   └── index.jsx
│
├── /redux (optional, if using Redux for state management)
│   ├── actions
│   │   ├── logsActions.js
│   │   └── metricsActions.js
│   │
│   ├── reducers
│   │   ├── logsReducer.js
│   │   └── metricsReducer.js
│   │
│   └── store.js
│
├── /utils
│   ├── api.js
│   └── helpers.js
│
├── /storybook
│   ├── /stories
│   │   ├── Navbar.stories.jsx
│   │   ├── Logs.stories.jsx
│   │   ├── Metrics.stories.jsx
│   │   └── Common.stories.jsx
│   │
│   └── preview.jsx
│
├── App.jsx
└── index.jsx
