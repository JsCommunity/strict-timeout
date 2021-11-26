/* eslint-disable */
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.safeTimeout = factory();
  }
})(
  typeof self !== "undefined" ? self : this,
  /* eslint-enable */
  function () {
    "use strict";

    var slice = Array.prototype.slice;
    var MAX_TIMEOUT = 2147483647;

    function Task(cb, delay, args) {
      this._args = args;
      this._cb = cb;
      this._delay = delay;
      this._handle = undefined;
    }

    Task.prototype.ref = function ref() {
      return this._handle.ref();
    };
    Task.prototype.unref = function unref() {
      return this._handle.unref();
    };

    function run(t) {
      var cb = t._cb;
      var args = t._args;
      t._args = t._cb = t._delay = t._handle = undefined;
      return cb.apply(undefined, args);
    }

    function schedule(task) {
      var delay = task._delay;
      if (delay > MAX_TIMEOUT) {
        task._delay -= MAX_TIMEOUT;
        task._handle = setTimeout(schedule, MAX_TIMEOUT, task);
      } else {
        task._handle = setTimeout(run, delay, task);
      }
    }

    function safeTimeout(cb, delay) {
      var task = new Task(cb, delay, slice.call(arguments, 2));
      schedule(task);
      return task;
    }

    safeTimeout.clear = function (t) {
      var handle = t._handle;
      t._args = t._cb = t._delay = t._handle = undefined;
      return clearTimeout(handle);
    };

    return safeTimeout;
  }
);
