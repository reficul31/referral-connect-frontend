import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      
    </Provider>
  </React.StrictMode>
);
