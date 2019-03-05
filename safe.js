/* eslint-disable */
// if the module has no dependencies, the above pattern can be simplified to
(function(root, factory) {
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
  function() {
    "use strict";

    var concat = Array.prototype.concat;
    var MAX_TIMEOUT = 2147483647;

    function Wrapper(handle) {
      this.handle = handle;
    }

    function safeTimeout(cb, delay) {
      var args;
      if (delay > MAX_TIMEOUT) {
        args = concat.apply([safeTimeout, MAX_TIMEOUT], arguments);
        args[3] = delay - MAX_TIMEOUT;
      } else {
        args = arguments;
      }
      return new Wrapper(setTimeout.apply(this, args));
    }

    safeTimeout.clear = function(wrapper) {
      return clearTimeout(wrapper.handle);
    };

    return safeTimeout;
  }
);
