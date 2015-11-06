'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var object = _react2['default'].PropTypes.object;

/**
 * The Navigation mixin provides methods for components
 * that need to modify the URL.
 *
 * Example:
 *
 *   import { Navigation } from 'react-router';
 *
 *   var MyLink = React.createClass({
 *     mixins: [ Navigation ],
 *     handleClick(event) {
 *       event.preventDefault();
 *       this.transitionTo('/the/path', { the: 'query' });
 *     },
 *     render() {
 *       return (
 *         <a onClick={this.handleClick}>Click me!</a>
 *       );
 *     }
 *   });
 */
var Navigation = {

  contextTypes: {
    history: object.isRequired
  },

  transitionTo: function transitionTo(pathname, query, state) {
    return this.context.history.pushState(state, pathname, query);
  },

  replaceWith: function replaceWith(pathname, query, state) {
    return this.context.history.replaceState(state, pathname, query);
  }

};

var RouterNavigationMethods = ['createPath', 'createHref', 'go', 'goBack', 'goForward'];

RouterNavigationMethods.forEach(function (method) {
  Navigation[method] = function () {
    var history = this.context.history;

    return history[method].apply(history, arguments);
  };
});

exports['default'] = Navigation;
module.exports = exports['default'];