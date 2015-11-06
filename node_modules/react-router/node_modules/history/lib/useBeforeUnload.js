'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

function startBeforeUnloadListener(getBeforeUnloadPromptMessage) {
  function listener(event) {
    var message = getBeforeUnloadPromptMessage();

    if (typeof message === 'string') {
      (event || window.event).returnValue = message;
      return message;
    }
  }

  _DOMUtils.addEventListener(window, 'beforeunload', listener);

  return function () {
    _DOMUtils.removeEventListener(window, 'beforeunload', listener);
  };
}

function useBeforeUnload(createHistory) {
  return function (options) {
    var history = createHistory(options);

    var stopBeforeUnloadListener;
    var beforeUnloadHooks = [];

    function getBeforeUnloadPromptMessage() {
      var message;

      for (var i = 0, len = beforeUnloadHooks.length; message == null && i < len; ++i) message = beforeUnloadHooks[i].call();

      return message;
    }

    function registerBeforeUnloadHook(hook) {
      if (_ExecutionEnvironment.canUseDOM && beforeUnloadHooks.indexOf(hook) === -1) {
        beforeUnloadHooks.push(hook);

        if (beforeUnloadHooks.length === 1) stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
      }
    }

    function unregisterBeforeUnloadHook(hook) {
      if (beforeUnloadHooks.length > 0) {
        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
          return item !== hook;
        });

        if (beforeUnloadHooks.length === 0) stopBeforeUnloadListener();
      }
    }

    return _extends({}, history, {
      registerBeforeUnloadHook: registerBeforeUnloadHook,
      unregisterBeforeUnloadHook: unregisterBeforeUnloadHook
    });
  };
}

exports['default'] = useBeforeUnload;
module.exports = exports['default'];