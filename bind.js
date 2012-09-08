(function () {

    var allArgsPlaceholder = {__isPlaceholder: true};

    function bind(fn, ctx, arg1 /*, ... */) {
        var args = Array.prototype.slice.call(arguments, 2),
            allPlaceholderIndex = args.indexOf(allArgsPlaceholder),
            placeholdersIndexes = args
                .map(function (arg, i) {
                    return Object(arg).__isPlaceholder ? i : -1;
                })
                .filter(function (index) { return index >= 0; });

        return function () {
            var localArgs = args.slice(),
                wrapperArgs = arguments;

            placeholdersIndexes.forEach(function (i) {
                localArgs[i] = wrapperArgs[localArgs[i].__i];
            });

            if (allPlaceholderIndex >= 0) {
                localArgs.splice.apply(localArgs,
                    Array.prototype.concat.apply([allPlaceholderIndex, 1], wrapperArgs));
            }

            return fn.apply(ctx, localArgs);
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
