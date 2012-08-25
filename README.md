bindjs
======

JavaScript implementation of C++ `std::bind`

Usage
-----

    bind(fn, ctx, arg1, arg2, ...)

First two arguments are function to be wraped and it's execution context (thisArg). Next arguments represents `fn` execution arguments. There is `bind.$` function for obtaining args placeholders:

* `bind.$()` - will be replaced by all wraper's arguments;
* `bind.$(n)` - will be replaced by nth wraper's argument (`bind.$n` is the same as `arguments[n]` in the wraper, i.e. `bind.$(1)` will be replaced by value from `arguments[0]`).

`bind` returns wrapped `fn`.

Examples
--------

    var dummyFn = function () { return arguments; };

    bind(dummyFn, this, bind.$())(1, 2); // -> [1, 2]

    bind(dummyFn, this, bind.$(1), bind.$(0))(1, 2); // -> [2, 1]

    bind(dummyFn, this, bind.$(0), 'foo', bind.$(1), 'bar')(1, 2); // -> [1, "foo", 2, "bar"]

See Also
--------

* [MSDN article about std::bind](http://msdn.microsoft.com/en-us/library/bb982702.aspx)

