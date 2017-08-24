# shortstop-dns

A shortstop handler to resolve all A and/or AAAA records.

Initializer takes an `Object {family = 4, all = true }`.

Takes an `address (String)`, and a `callback (function)`. `callback` called with `err (Error|null)`, `addresses (null|Array|string)`.

`addresses` will be null if `err`, will be an Array if `all: true`, or a string if `all: false`.
