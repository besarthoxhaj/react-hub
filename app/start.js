require('babel-polyfill');
require('isomorphic-fetch');

require('babel-core/register')({presets:['es2015'],plugins:[
  'transform-object-rest-spread',
  'transform-flow-strip-types',
  'transform-react-jsx'
]});

require('./index.js');
