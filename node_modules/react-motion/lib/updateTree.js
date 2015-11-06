'use strict';

exports.__esModule = true;
exports.interpolateValue = interpolateValue;
exports.updateCurrValue = updateCurrValue;
exports.updateCurrVelocity = updateCurrVelocity;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _mapTree = require('./mapTree');

var _mapTree2 = _interopRequireDefault(_mapTree);

var _stepper = require('./stepper');

var _stepper2 = _interopRequireDefault(_stepper);

var _zero = require('./zero');

var _zero2 = _interopRequireDefault(_zero);

var _presets = require('./presets');

// TODO: refactor common logic with updateCurrValue and updateCurrVelocity

var _presets2 = _interopRequireDefault(_presets);

function interpolateValue(alpha, nextValue, prevValue) {
  if (nextValue == null) {
    return null;
  }
  if (prevValue == null) {
    return nextValue;
  }
  if (typeof nextValue === 'number') {
    // https://github.com/chenglou/react-motion/pull/57#issuecomment-121924628
    return nextValue * alpha + prevValue * (1 - alpha);
  }
  if (nextValue.val != null && nextValue.config && nextValue.config.length === 0) {
    return nextValue;
  }
  if (nextValue.val != null) {
    var ret = {
      val: interpolateValue(alpha, nextValue.val, prevValue.val)
    };
    if (nextValue.config) {
      ret.config = nextValue.config;
    }
    return ret;
  }
  if (Array.isArray(nextValue)) {
    return nextValue.map(function (_, i) {
      return interpolateValue(alpha, nextValue[i], prevValue[i]);
    });
  }
  if (_lodashIsplainobject2['default'](nextValue)) {
    return Object.keys(nextValue).reduce(function (ret, key) {
      ret[key] = interpolateValue(alpha, nextValue[key], prevValue[key]);
      return ret;
    }, {});
  }
  return nextValue;
}

// TODO: refactor common logic with _updateCurrVelocity
function _updateCurrValue(frameRate, currValue, currVelocity, endValue, k, b) {
  if (endValue == null) {
    return null;
  }
  if (typeof endValue === 'number') {
    if (k == null || b == null) {
      return endValue;
    }
    // TODO: do something to stepper to make this not allocate (2 steppers?)
    return _stepper2['default'](frameRate, currValue, currVelocity, endValue, k, b)[0];
  }
  if (endValue.val != null && endValue.config && endValue.config.length === 0) {
    return endValue;
  }
  if (endValue.val != null) {
    var _ref = endValue.config || _presets2['default'].noWobble;

    var _k = _ref[0];
    var _b = _ref[1];

    var ret = {
      val: _updateCurrValue(frameRate, currValue.val, currVelocity.val, endValue.val, _k, _b)
    };
    if (endValue.config) {
      ret.config = endValue.config;
    }
    return ret;
  }
  if (Array.isArray(endValue)) {
    return endValue.map(function (_, i) {
      return _updateCurrValue(frameRate, currValue[i], currVelocity[i], endValue[i], k, b);
    });
  }
  if (_lodashIsplainobject2['default'](endValue)) {
    return Object.keys(endValue).reduce(function (ret, key) {
      ret[key] = _updateCurrValue(frameRate, currValue[key], currVelocity[key], endValue[key], k, b);
      return ret;
    }, {});
  }
  return endValue;
}

function updateCurrValue(frameRate, currValue, currVelocity, endValue) {
  if (typeof endValue === 'number') {
    var _presets$noWobble = _presets2['default'].noWobble;
    var k = _presets$noWobble[0];
    var b = _presets$noWobble[1];

    return _stepper2['default'](frameRate, currValue, currVelocity, endValue, k, b)[0];
  }

  return _updateCurrValue(frameRate, currValue, currVelocity, endValue);
}

function _updateCurrVelocity(frameRate, currValue, currVelocity, endValue, k, b) {
  if (endValue == null) {
    return null;
  }
  if (typeof endValue === 'number') {
    if (k == null || b == null) {
      return _mapTree2['default'](_zero2['default'], currVelocity);
    }
    // TODO: do something to stepper to make this not allocate (2 steppers?)
    return _stepper2['default'](frameRate, currValue, currVelocity, endValue, k, b)[1];
  }
  if (endValue.val != null && endValue.config && endValue.config.length === 0) {
    return _mapTree2['default'](_zero2['default'], currVelocity);
  }
  if (endValue.val != null) {
    var _ref2 = endValue.config || _presets2['default'].noWobble;

    var _k = _ref2[0];
    var _b = _ref2[1];

    var ret = {
      val: _updateCurrVelocity(frameRate, currValue.val, currVelocity.val, endValue.val, _k, _b)
    };
    if (endValue.config) {
      ret.config = endValue.config;
    }
    return ret;
  }
  if (Array.isArray(endValue)) {
    return endValue.map(function (_, i) {
      return _updateCurrVelocity(frameRate, currValue[i], currVelocity[i], endValue[i], k, b);
    });
  }
  if (_lodashIsplainobject2['default'](endValue)) {
    return Object.keys(endValue).reduce(function (ret, key) {
      ret[key] = _updateCurrVelocity(frameRate, currValue[key], currVelocity[key], endValue[key], k, b);
      return ret;
    }, {});
  }
  return _mapTree2['default'](_zero2['default'], currVelocity);
}

function updateCurrVelocity(frameRate, currValue, currVelocity, endValue) {
  if (typeof endValue === 'number') {
    var _presets$noWobble2 = _presets2['default'].noWobble;
    var k = _presets$noWobble2[0];
    var b = _presets$noWobble2[1];

    return _stepper2['default'](frameRate, currValue, currVelocity, endValue, k, b)[1];
  }

  return _updateCurrVelocity(frameRate, currValue, currVelocity, endValue);
}