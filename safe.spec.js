/* eslint-env jest */

var safeTimeout = require("./safe");

jest.useFakeTimers();

describe("strictTimeout", function() {
  "use strict";

  var MAX_TIMEOUT = 2147483647;

  it("works with big delays", function() {
    var cb = jest.fn();
    safeTimeout(cb, MAX_TIMEOUT * 2, "foo", "bar");

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(MAX_TIMEOUT);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(MAX_TIMEOUT);
    expect(cb.mock.calls).toEqual([["foo", "bar"]]);
  });

  it("timeout can be cleared", function() {
    var cb = jest.fn();
    safeTimeout.clear(safeTimeout(cb, 10));

    jest.advanceTimersByTime(10);
    expect(cb).not.toHaveBeenCalled();
  });
});
