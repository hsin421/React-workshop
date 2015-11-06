'use strict';

exports.__esModule = true;
exports['default'] = mapTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashIsplainobject = require('lodash.isplainobject');

// currenly a helper used for producing a tree of the same shape as the
// input(s),  but with different values. It's technically not a real `map`
// equivalent for trees, since it skips calling f on non-numbers.

// TODO: probably doesn't need path, stop allocating uselessly
// TODO: don't need to map over many trees anymore
// TODO: skipping non-numbers is weird and non-generic. Use pre-order traversal
// assume trees are of the same shape

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

function _mapTree(path, f, trees) {
  var t1 = trees[0];
  if (typeof t1 === 'number') {
    return f.apply(undefined, [path].concat(trees));
  }
  if (Array.isArray(t1)) {
    return t1.map(function (_, i) {
      return _mapTree([].concat(path, [i]), f, trees.map(function (val) {
        return val[i];
      }));
    });
  }
  if (_lodashIsplainobject2['default'](t1)) {
    return Object.keys(t1).reduce(function (newTree, key) {
      newTree[key] = _mapTree([].concat(path, [key]), f, trees.map(function (val) {
        return val[key];
      }));
      return newTree;
    }, {});
  }
  // return last one just because
  return trees[trees.length - 1];
}

function mapTree(f) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return _mapTree([], f, rest);
}

module.exports = exports['default'];