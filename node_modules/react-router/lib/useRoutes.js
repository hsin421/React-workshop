'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _historyLibUseQueries = require('history/lib/useQueries');

var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

var _computeChangedRoutes2 = require('./computeChangedRoutes');

var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

var _TransitionUtils = require('./TransitionUtils');

var _isActive2 = require('./isActive');

var _isActive3 = _interopRequireDefault(_isActive2);

var _getComponents = require('./getComponents');

var _getComponents2 = _interopRequireDefault(_getComponents);

var _matchRoutes = require('./matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

/**
 * Enhances a history object with the following methods:
 *
 * - isActive(pathname, query)
 * - registerRouteHook(route, (location) => {})
 * - unregisterRouteHook(route, (location) => {})
 * - listen((error, state) => {})
 * - match(location, (error, state) => {})
 */
function useRoutes(createHistory) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var routes = options.routes;

    var historyOptions = _objectWithoutProperties(options, ['routes']);

    var history = _historyLibUseQueries2['default'](createHistory)(historyOptions);
    var state;

    function isActive(pathname, query) {
      return _isActive3['default'](pathname, query, state.location, state.routes, state.params);
    }

    // TODO: If we had a way to uniquely identify a route,
    // we could use a plain object here instead...
    var routeHooks = new Map();
    var partialNextState;

    function match(location, callback) {
      if (partialNextState && partialNextState.location === location) {
        // Continue from where we left off.
        finishMatch(partialNextState, callback);
      } else {
        _matchRoutes2['default'](routes, location, function (error, nextState) {
          if (error) {
            callback(error);
          } else {
            finishMatch(_extends({}, nextState, { location: location }), callback);
          }
        });
      }
    }

    function finishMatch(nextState, callback) {
      var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);

      var leaveRoutes = _computeChangedRoutes.leaveRoutes;
      var enterRoutes = _computeChangedRoutes.enterRoutes;

      _TransitionUtils.runLeaveHooks(leaveRoutes);

      _TransitionUtils.runEnterHooks(enterRoutes, nextState, function (error, redirectInfo) {
        if (error) {
          callback(error);
        } else if (redirectInfo) {
          var pathname = redirectInfo.pathname;
          var query = redirectInfo.query;
          var state = redirectInfo.state;

          history.replaceState(state, pathname, query);
          callback();
        } else {
          // TODO: Fetch components after state is updated.
          _getComponents2['default'](nextState.routes, function (error, components) {
            if (error) {
              callback(error);
            } else {
              state = _extends({}, nextState, { components: components });
              callback(null, state);
            }
          });
        }
      });
    }

    function getRouteHooksForRoutes(routes) {
      return routes.reduce(function (hooks, route) {
        hooks.push.apply(hooks, routeHooks.get(route));
        return hooks;
      }, []);
    }

    function transitionHook(location, callback) {
      _matchRoutes2['default'](routes, location, function (error, nextState) {
        if (error) {
          // TODO: Handle the error.
          callback(false); // Cancel the transition.
        } else {
            // Cache some state here so we don't have to
            // matchRoutes() again in the listen callback.
            partialNextState = _extends({}, nextState, { location: location });

            var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, nextState).leaveRoutes);

            var result;
            for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
              // Passing the location arg here indicates to
              // the user that this is a transition hook.
              result = hooks[i](location);
            }

            // Callback with the result from the first route
            // hook that has a non-null return value.
            callback(result);
          }
      });
    }

    function beforeUnloadHook() {
      // Synchronously check to see if any route hooks want to
      // prevent the current window/tab from closing.
      if (state && state.routes) {
        var hooks = getRouteHooksForRoutes(state.routes);

        var message;
        for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
          // Passing no args indicates to the user that this is a
          // beforeunload hook. We don't know the next location.
          message = hooks[i]();
        }

        // Return the result from the first route hook
        // that returns a prompt message.
        return message;
      }
    }

    function registerRouteHook(route, hook) {
      // TODO: Warn if they register for a route that isn't currently
      // active. They're probably doing something wrong, like re-creating
      // route objects on every location change.
      var hooks = routeHooks.get(route);

      if (hooks == null) {
        routeHooks.set(route, hooks = [hook]);

        if (routeHooks.size === 1) {
          history.registerTransitionHook(transitionHook);

          if (history.registerBeforeUnloadHook) history.registerBeforeUnloadHook(beforeUnloadHook);
        }
      } else if (hooks.indexOf(hook) === -1) {
        hooks.push(hook);
      }
    }

    function unregisterRouteHook(route, hook) {
      var hooks = routeHooks.get(route);

      if (hooks != null) {
        var newHooks = hooks.filter(function (item) {
          return item !== hook;
        });

        if (newHooks.length === 0) {
          routeHooks['delete'](route);

          if (routeHooks.size === 0) {
            history.unregisterTransitionHook(transitionHook);

            if (history.unregisterBeforeUnloadHook) history.unregisterBeforeUnloadHook(beforeUnloadHook);
          }
        } else {
          routeHooks.set(route, newHooks);
        }
      }
    }

    function dispatch(location, callback) {
      if (state && state.location === location) {
        callback(null, state);
        return;
      }

      match(location, function (error, nextState) {
        if (error) {
          callback(error);
        } else if (nextState) {
          callback(null, state = nextState);
        }
      });
    }

    function listen(listener) {
      return history.listen(function (location) {
        dispatch(location, listener);
      });
    }

    return _extends({}, history, {
      isActive: isActive,
      registerRouteHook: registerRouteHook,
      unregisterRouteHook: unregisterRouteHook,
      listen: listen,
      match: match
    });
  };
}

exports['default'] = useRoutes;
module.exports = exports['default'];