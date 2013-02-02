(function () {

    var allArgsPlaceholder = {__isPlaceholder: true};

    function bind(fn, ctx, arg1 /*, ... */) {
        var args = Array.prototype.slice.call(arguments, 2);

        var mapArgs = new Function('wrapperArgs, bindArgs', [
            'return Array.prototype.concat.call([],',
                args
                    .maps(function (arg, i) {
                        if (Object(arg).__isPlaceholder) {
                            return isNaN(arg.__i) ?
                                'Array.prototype.slice.call(wrapperArgs)' :
                                'wrapperArgs[' + arg.__i + ']';
                        } else {
                            return 'bindArgs[' + i + ']';
                        }
                    })
                    .join();
            ')'].join(''));

        return function () {
            return fn.apply(ctx, mapsArgs(arguments, args));
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
