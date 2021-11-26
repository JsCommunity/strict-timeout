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
      this.args = args;
      this.cb = cb;
      this.delay = delay;
      this.handle = undefined;
    }

    function run(t) {
      var cb = t.cb;
      var args = t.args;
      t.args = t.cb = t.delay = t.handle = undefined;
      return cb.apply(undefined, args);
    }

    function schedule(task) {
      var delay = task.delay;
      if (delay > MAX_TIMEOUT) {
        task.delay -= MAX_TIMEOUT;
        task.handle = setTimeout(schedule, MAX_TIMEOUT, task);
      } else {
        task.handle = setTimeout(run, delay, task);
      }
    }

    function safeTimeout(cb, delay) {
      var task = new Task(cb, delay, slice.call(arguments, 2));
      schedule(task);
      return task;
    }

    safeTimeout.clear = function (t) {
      var handle = t.handle;
      t.args = t.cb = t.delay = t.handle = undefined;
      return clearTimeout(handle);
    };

    return safeTimeout;
  }
);
