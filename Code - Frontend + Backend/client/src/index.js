import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Components/Root'
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
