// this file is the entry point for our application

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import reducer from './reducers/ticket-list-reducer';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
//this rendor method is responsible for rendering React elements to the DOM. it takes two arguments- 1) the element that will be rendered in the DOM and 2) is where the elements should be rendered


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
