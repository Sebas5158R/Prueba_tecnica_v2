import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faCircleUser, faMagnifyingGlass, faHouse, faChevronDown, faTable, faInbox, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft, faCircleUser, faMagnifyingGlass, faHouse, faChevronDown, faTable, faInbox, faGear, faArrowRightFromBracket)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
