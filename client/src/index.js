// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';               // ← Tailwind styles
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </Provider>
);
