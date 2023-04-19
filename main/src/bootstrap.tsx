import React from 'react';
import { createRoot }  from 'react-dom/client';

import { ErrorBoundary } from './utils/ErrorBoundary';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
