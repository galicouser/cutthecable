import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './components/store';
import { Provider } from 'react-redux';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);