/**
 * @flow
 *
 * Global config file.
 */

import { mergeAll } from 'ramda';

export const dev = {
  baseUrl: `http://localhost:3010`,
  api: `http://localhost:9000`,
};

export const stag = {
  baseUrl: `/`,
  api: 'https://staging.com',
};

export const prod = {
  baseUrl: `/`,
  api: 'https://production.com',
};

export const envs = {
  dev,
  stag,
  prod,
};

export default (key:string) => mergeAll([
  {},
  envs[window._REACT_ENV || 'dev'],
])[key];
