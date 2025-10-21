import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { store } from './components/store/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = '519568662801-iutej8itc3v9ms5or8vfhmqu36st4fj4.apps.googleusercontent.com';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);