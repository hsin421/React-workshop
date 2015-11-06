'use strict';

exports.__esModule = true;

var _AsyncUtils = require('./AsyncUtils');

function getComponentsForRoute(route, callback) {
  if (route.component || route.components) {
    callback(null, route.component || route.components);
  } else if (route.getComponents) {
    route.getComponents(callback);
  } else {
    callback();
  }
}

/**
 * Asynchronously fetches all components needed for the given router
 * state and calls callback(error, components) when finished.
 *
 * Note: This operation may finish synchronously if no routes have an
 * asynchronous getComponents method.
 */
function getComponents(routes, callback) {
  _AsyncUtils.mapAsync(routes, function (route, index, callback) {
    getComponentsForRoute(route, callback);
  }, callback);
}

exports['default'] = getComponents;
module.exports = exports['default'];