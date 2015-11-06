'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = components;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mapTree = require('./mapTree');

var _mapTree2 = _interopRequireDefault(_mapTree);

var _noVelocity = require('./noVelocity');

var _noVelocity2 = _interopRequireDefault(_noVelocity);

var _compareTrees = require('./compareTrees');

var _compareTrees2 = _interopRequireDefault(_compareTrees);

var _mergeDiff = require('./mergeDiff');

var _mergeDiff2 = _interopRequireDefault(_mergeDiff);

var _animationLoop = require('./animationLoop');

var _animationLoop2 = _interopRequireDefault(_animationLoop);

var _zero = require('./zero');

var _zero2 = _interopRequireDefault(_zero);

var _updateTree = require('./updateTree');

var startAnimation = _animationLoop2['default']();

function animationStep(shouldMerge, stopAnimation, getProps, timestep, state) {
  var currValue = state.currValue;
  var currVelocity = state.currVelocity;

  var _getProps = getProps();

  var willEnter = _getProps.willEnter;
  var willLeave = _getProps.willLeave;
  var endValue = _getProps.endValue;

  if (typeof endValue === 'function') {
    endValue = endValue(currValue);
  }

  var mergedValue = endValue; // set mergedValue to endValue as the default
  var hasNewKey = false;

  if (shouldMerge) {
    mergedValue = _mergeDiff2['default'](currValue, endValue,
    // TODO: stop allocating like crazy in this whole code path
    function (key) {
      var res = willLeave(key, currValue[key], endValue, currValue, currVelocity);
      if (res == null) {
        // For legacy reason. We won't allow returning null soon
        // TODO: remove, after next release
        return null;
      }

      if (_noVelocity2['default'](currVelocity[key]) && _compareTrees2['default'](currValue[key], res)) {
        return null;
      }
      return res;
    });

    Object.keys(mergedValue).filter(function (key) {
      return !currValue.hasOwnProperty(key);
    }).forEach(function (key) {
      var _extends2, _extends3;

      hasNewKey = true;
      var enterValue = willEnter(key, mergedValue[key], endValue, currValue, currVelocity);

      // We can mutate this here because mergeDiff returns a new Obj
      mergedValue[key] = enterValue;

      currValue = _extends({}, currValue, (_extends2 = {}, _extends2[key] = enterValue, _extends2));
      currVelocity = _extends({}, currVelocity, (_extends3 = {}, _extends3[key] = _mapTree2['default'](_zero2['default'], enterValue), _extends3));
    });
  }
  var newCurrValue = _updateTree.updateCurrValue(timestep, currValue, currVelocity, mergedValue);
  var newCurrVelocity = _updateTree.updateCurrVelocity(timestep, currValue, currVelocity, mergedValue);

  if (!hasNewKey && _noVelocity2['default'](currVelocity) && _noVelocity2['default'](newCurrVelocity)) {
    // check explanation in `Spring.animationRender`
    stopAnimation(); // Nasty side effects....
  }

  return {
    currValue: newCurrValue,
    currVelocity: newCurrVelocity
  };
}

function components(React) {
  var PropTypes = React.PropTypes;

  var Spring = React.createClass({
    displayName: 'Spring',

    propTypes: {
      defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
      endValue: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array, PropTypes.number]).isRequired,
      children: PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
      var _props = this.props;
      var endValue = _props.endValue;
      var defaultValue = _props.defaultValue;

      var currValue = undefined;
      if (defaultValue == null) {
        if (typeof endValue === 'function') {
          // TODO: provide perf tip here when endValue argument count is 0
          // (meaning you could have passed an obj)
          currValue = endValue();
        } else {
          currValue = endValue;
        }
      } else {
        currValue = defaultValue;
      }
      return {
        currValue: currValue,
        currVelocity: _mapTree2['default'](_zero2['default'], currValue)
      };
    },

    componentDidMount: function componentDidMount() {
      var _this = this;

      this.animationStep = animationStep.bind(null, false, function () {
        return _this.stopAnimation();
      }, function () {
        return _this.props;
      });
      this.startAnimating();
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
      this.startAnimating();
    },

    stopAnimation: null,

    // used in animationRender
    hasUnmounted: false,

    animationStep: null,

    componentWillUnmount: function componentWillUnmount() {
      this.stopAnimation();
      this.hasUnmounted = true;
    },

    startAnimating: function startAnimating() {
      // Is smart enough to not start it twice
      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
    },

    animationRender: function animationRender(alpha, nextState, prevState) {
      // `this.hasUnmounted` might be true in the following condition:
      // user does some checks in `endValue` and calls an owner handler
      // owner sets state in the callback, triggering a re-render
      // re-render unmounts the Spring
      if (!this.hasUnmounted) {
        this.setState({
          currValue: _updateTree.interpolateValue(alpha, nextState.currValue, prevState.currValue),
          currVelocity: nextState.currVelocity
        });
      }
    },

    render: function render() {
      var renderedChildren = this.props.children(this.state.currValue);
      return renderedChildren && React.Children.only(renderedChildren);
    }
  });

  // TODO: warn when obj uses numerical keys
  // TODO: warn when endValue doesn't contain a val
  var TransitionSpring = React.createClass({
    displayName: 'TransitionSpring',

    propTypes: {
      defaultValue: PropTypes.objectOf(PropTypes.any),
      endValue: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any.isRequired)]).
      // PropTypes.arrayOf(PropTypes.shape({
      //   key: PropTypes.any.isRequired,
      // })),
      // PropTypes.arrayOf(PropTypes.element),
      isRequired,
      willLeave: PropTypes.oneOfType([PropTypes.func]),

      // PropTypes.object,
      // PropTypes.array,
      willEnter: PropTypes.oneOfType([PropTypes.func]),

      // PropTypes.object,
      // PropTypes.array,
      children: PropTypes.func.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        willEnter: function willEnter(key, value) {
          return value;
        },
        willLeave: function willLeave() {
          return null;
        }
      };
    },

    getInitialState: function getInitialState() {
      var _props2 = this.props;
      var endValue = _props2.endValue;
      var defaultValue = _props2.defaultValue;

      var currValue = undefined;
      if (defaultValue == null) {
        if (typeof endValue === 'function') {
          currValue = endValue();
        } else {
          currValue = endValue;
        }
      } else {
        currValue = defaultValue;
      }
      return {
        currValue: currValue,
        currVelocity: _mapTree2['default'](_zero2['default'], currValue)
      };
    },

    componentDidMount: function componentDidMount() {
      var _this2 = this;

      this.animationStep = animationStep.bind(null, true, function () {
        return _this2.stopAnimation();
      }, function () {
        return _this2.props;
      });
      this.startAnimating();
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
      this.startAnimating();
    },

    stopAnimation: null,

    // used in animationRender
    hasUnmounted: false,

    animationStep: null,

    componentWillUnmount: function componentWillUnmount() {
      this.stopAnimation();
    },

    startAnimating: function startAnimating() {
      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
    },

    animationRender: function animationRender(alpha, nextState, prevState) {
      // See comment in Spring.
      if (!this.hasUnmounted) {
        this.setState({
          currValue: _updateTree.interpolateValue(alpha, nextState.currValue, prevState.currValue),
          currVelocity: nextState.currVelocity
        });
      }
    },

    render: function render() {
      var renderedChildren = this.props.children(this.state.currValue);
      return renderedChildren && React.Children.only(renderedChildren);
    }
  });

  return { Spring: Spring, TransitionSpring: TransitionSpring };
}

module.exports = exports['default'];