import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import Test from './test';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <>
    <App title="Shivanand" desc="Developer" />
    <App title="Akshay" desc="Developer" />
    <Test />
  </>,
);
