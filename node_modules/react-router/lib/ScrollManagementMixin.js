'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('history');

var _DOMUtils = require('./DOMUtils');

var func = _react2['default'].PropTypes.func;

function getCommonAncestors(routes, otherRoutes) {
  return routes.filter(function (route) {
    return otherRoutes.indexOf(route) !== -1;
  });
}

function shouldUpdateScrollPosition(state, prevState) {
  var location = state.location;
  var routes = state.routes;
  var prevLocation = prevState.location;
  var prevRoutes = prevState.routes;

  // When an onEnter hook uses transition.to to redirect
  // on the initial load prevLocation is null, so assume
  // we don't want to update the scroll position.
  if (prevLocation === null) return false;

  // Don't update scroll position if only the query has changed.
  if (location.pathname === prevLocation.pathname) return false;

  // Don't update scroll position if any of the ancestors
  // has `ignoreScrollPosition` set to `true` on the route.
  var sharedAncestors = getCommonAncestors(routes, prevRoutes);
  if (sharedAncestors.some(function (route) {
    return route.ignoreScrollBehavior;
  })) return false;

  return true;
}

function updateWindowScrollPosition(action, scrollX, scrollY) {
  if (_DOMUtils.canUseDOM) {
    if (action === _history.Actions.POP) {
      _DOMUtils.setWindowScrollPosition(scrollX, scrollY);
    } else {
      _DOMUtils.setWindowScrollPosition(0, 0);
    }
  }
}

var ScrollManagementMixin = {

  propTypes: {
    shouldUpdateScrollPosition: func.isRequired,
    updateScrollPosition: func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      shouldUpdateScrollPosition: shouldUpdateScrollPosition,
      updateScrollPosition: updateWindowScrollPosition
    };
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var location = this.state.location;

    if (location && this.props.shouldUpdateScrollPosition(this.state, prevState)) {
      var action = location.action;
      var scrollX = location.scrollX;
      var scrollY = location.scrollY;

      this.props.updateScrollPosition(action, scrollX || 0, scrollY || 0);
    }
  }

};

exports['default'] = ScrollManagementMixin;
module.exports = exports['default'];