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
    root.strictTimeout = factory();
  }
})(
  typeof self !== "undefined" ? self : this,
  /* eslint-enable */
  function () {
    "use strict";

    var MAX_TIMEOUT = 2147483647;
    var ERROR_MESSAGE = "delay cannot exceed " + MAX_TIMEOUT;

    return function strictTimeout(_, delay) {
      if (delay > MAX_TIMEOUT) {
        throw new RangeError(ERROR_MESSAGE);
      }
      return setTimeout.apply(this, arguments);
    };
  }
);
