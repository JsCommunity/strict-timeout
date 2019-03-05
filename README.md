# strict-timeout ![](https://badgen.net/npm/v/strict-timeout) ![](https://badgen.net/bundlephobia/minzip/strict-timeout)

> `setTimeout()` that throws instead of misbehaving with large delays

A value larger than 2147483647 milliseconds (~25 days) is too large to fit into a signed 32-bit integer, which is not supported by some JS engines, which will silently use 1 millisecond instead.

Such a surprising behavior is a very bad idea and has caused me issues a couple of times.

This module exports a small wrapper around `setTimeout` which will throw a `RangeError` if the specified delay is above this value.

## Install

```
> npm install strict-timeout
```

### Compatibility

Should be compatible with pretty much anything that provides a global `setTimeout` and `clearTimeout`:

- no dependencies
- ECMAScript 3
- [universal module](https://github.com/umdjs/umd)

## Usage

The API is exactly the same as native
[`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
and the returned result can be used with native
[`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout),
the only difference is that it will throw if the delay is too big.

```js
const strictTimeout = require("strict-timeout");

const handle = setTimeout(callback, delay, arg1, arg2);
```

### `safeTimeout`

This module also provides a _safe_ version of `setTimeout` which will correctly behave with huge delays.

As for `strictTimeout`, the API is the same as native `setTimeout`, **but** you cannot use native `clearTimeout` for this one, you must use `safeTimeout.clear()` instead:

```js
const safeTimeout = require("strict-timeout/safe");

const handle = safeTimeout(callback, delay, arg1, arg2);

// you cannot use native clearTimeout!
safeTimeout.clear(handle);
```

## License

ISC © [Julien Fontanet](https://github.com/julien-f)
