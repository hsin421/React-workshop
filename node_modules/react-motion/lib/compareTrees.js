'use strict';

exports.__esModule = true;
exports['default'] = compareTrees;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

function compareTrees(a, b) {
  if (Array.isArray(a)) {
    return a.every(function (v, i) {
      return compareTrees(v, b[i]);
    });
  }

  if (_lodashIsplainobject2['default'](a)) {
    return Object.keys(a).every(function (key) {
      return key === 'config' ? true : compareTrees(a[key], b[key]);
    });
  }

  return a === b;
}

module.exports = exports['default'];