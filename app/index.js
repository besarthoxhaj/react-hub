import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';

import App from './main';
import createStore from './store';

/**
 * IMPORTANT: History object
 * Needed in the Router container and passed through
 * Main and App. It is injected in order to be mocked
 * by the tests with `createMemoryHistory`. For more
 * info check the docs:
 * - https://git.io/v9CCL
 *
 */
const history = createMemoryHistory();

/**
 * IMPORTANT
 * Init Store and Sagas
 */
const store = createStore({ history });

const render = Component => {
  return ReactDOM.render(
    <Component store={store} history={history} />,
    document.getElementById('root')
  );
};

render(App);
