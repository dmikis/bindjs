(function () {

    var allArgsPlaceholder = {__isPlaceholder: true};

    function bind(fn, ctx, arg1 /*, ... */) {
        var args = Array.prototype.slice.call(arguments, 2);

        return function () {
            var wraperArgs = Array.prototype.slice.call(arguments),
                localArgs = args.slice(),
                allPlaceholderIndex = localArgs.indexOf(allArgsPlaceholder);

            if (allPlaceholderIndex >= 0) {
                localArgs.splice.apply(localArgs, [allPlaceholderIndex, 1].concat(wraperArgs));
            }

            return fn.apply(ctx, localArgs.map(function (arg) {
                return (typeof arg === 'object' && arg.__isPlaceholder) ? wraperArgs[arg.__i] : arg;
            }));
        };
    }

    bind.$ = function (argIndex) {
        return typeof argIndex === 'number' ?
            {
                __i: argIndex,
                __isPlaceholder: true
            } :
            allArgsPlaceholder;
    }

    if (typeof module === 'object') {
        module.exports = bind;
    } else {
        this.bind = bind;
    }

}());
