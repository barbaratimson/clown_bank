import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router/>
  // <React.StrictMode>
  // </React.StrictMode>
);

