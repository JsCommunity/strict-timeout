/* eslint-env jest */

var strictTimeout = require("./");

var noop = Function.prototype;

describe("strictTimeout", function() {
  "use strict";

  it("throws if timeout is too big", function() {
    expect(function() {
      strictTimeout(noop, Math.pow(2, 31));
    }).toThrow(RangeError);
  });
});
