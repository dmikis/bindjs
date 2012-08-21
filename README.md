bindjs
======

JavaScript implementation of C++ `std::bind`

Usage
-----

    bind(fn, ctx, arg1, arg2, ...)

First two arguments are function to be wraped and it's execution context (thisArg). Next arguments represents `fn` execution arguments. There are some placeholders for passing wraper's arguments to `fn`:

* `bind.$0` - will be replaced by all wraper's arguments;
* `bind.$n` - will be replaced by nth wraper's argument (`bind.$n` is the same as `arguments[n-1]` in the wraper, i.e. `bind.$1` will be replaced by value from `arguments[0]`).

`bind` returns wrapped `fn`.

Examples
--------

    var dummyFn = function () { return arguments; };

    bind(dummyFn, this, bind.$0)(1, 2); // -> [1, 2]

    bind(dummyFn, this, bind.$2, bind.$1)(1, 2); // -> [2, 1]

    bind(dummyFn, this, bind.$1, 'foo', bind.$2, 'bar')(1, 2); // -> [1, "foo", 2, "bar"]

See Also
--------

* [MSDN article about std::bind](http://msdn.microsoft.com/en-us/library/bb982702.aspx)

