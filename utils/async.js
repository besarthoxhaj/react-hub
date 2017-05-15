'use strict';

/**
 * Middleware async pattern. Usage:
 *
 * var app = makeApp();
 *
 * app.add(function (next) {
 *  console.log('One!');
 *  next();
 * });
 *
 * app.add(function (next) {
 *  console.log('Two!');
 *  next();
 * });
 *
 * app();
 * // One!
 * // Two!
 */

module.exports = makeApp;

function makeApp (browser) {
  var middlewareStore = [];
  function app (lastFun) {
    middlewareStore.push(lastFun);
    var index = 0;
    function next (err) {
      var layer = middlewareStore[index++];
      if (layer) {
        return layer(next,browser);
      }
    }
    next();
  }
  app.add = function (fn) {
    middlewareStore.push(fn);
  }
  return app;
}
