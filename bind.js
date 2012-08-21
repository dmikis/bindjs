(function () {

    function bind(fn, ctx, arg1 /*, ... */) {
        var args = Array.prototype.slice.call(arguments, 2);

        return function () {
            var wraperArgs = Array.prototype.slice.call(arguments),
                localArgs = args.slice(),
                allPlaceholderIndex = localArgs.indexOf(bind.$0);

            if (allPlaceholderIndex >= 0) {
                localArgs.splice.apply(localArgs, [allPlaceholderIndex, 1].concat(wraperArgs));
            }

            return fn.apply(ctx, localArgs.map(function (arg) {
                return (typeof arg === 'object' && arg.__isPlaceholder) ? wraperArgs[arg.__i - 1] : arg;
            }));
        };
    }

    [0, 1, 2, 3, 4, 5].forEach(function (pIndex) {
        bind['$' + pIndex] = {
            __isPlaceholder: true,
            __i: pIndex
        };
    });

    if (typeof module === 'object') {
        module.exports = bind;
    } else {
        this.bind = bind;
    }

}());
