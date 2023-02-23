import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary';
import Todo from './Todo';
// import App from './app';
// import Demo from './test';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <>
    {/* <App title="Shivanand" desc="Developer" /> */}
    {/* <App title="Akshay" desc="Developer" /> */}
    {/* <Demo count={10} /> */}
    <ErrorBoundary>
      <Todo />
    </ErrorBoundary>

  </>,
);
