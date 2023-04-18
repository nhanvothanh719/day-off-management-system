import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';

//Prevent ResizeObserver loop limit exceeded
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);