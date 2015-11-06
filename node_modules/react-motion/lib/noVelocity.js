'use strict';

exports.__esModule = true;
exports['default'] = noVelocity;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

function noVelocity(coll) {
  if (Array.isArray(coll)) {
    return coll.every(noVelocity);
  }
  if (_lodashIsplainobject2['default'](coll)) {
    return Object.keys(coll).every(function (key) {
      return key === 'config' ? true : noVelocity(coll[key]);
    });
  }
  return typeof coll === 'number' ? coll === 0 : true;
}

module.exports = exports['default'];