"use strict";
const then = (first, second) => fun((input) => second(first(input)));
const fun = (f) => {
    const fDecorated = f;
    fDecorated.then = function (postProcess) {
        return then(this, postProcess);
    };
    return fDecorated;
};
