'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var object = _react2['default'].PropTypes.object;

/**
 * The State mixin provides components with an isActive(pathname, query)
 * method they can use to check if a given pathname/query are active.
 *
 * Example:
 *
 *   import { State } from 'react-router';
 *
 *   var AboutLink = React.createClass({
 *     mixins: [ State ],
 *     render() {
 *       var className = this.props.className;
 *
 *       if (this.isActive('/about'))
 *         className += ' is-active';
 *
 *       return React.createElement('a', { className }, this.props.children);
 *     }
 *   });
 */
var State = {

  contextTypes: {
    history: object.isRequired
  },

  isActive: function isActive(pathname, query) {
    return this.context.history.isActive(pathname, query);
  }

};

exports['default'] = State;
module.exports = exports['default'];