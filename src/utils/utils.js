"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickMany = exports.Fun = exports.Then = void 0;
const Then = (first, second) => (0, exports.Fun)((input) => second(first(input)));
exports.Then = Then;
const Fun = (f) => {
    const fDecorated = f;
    fDecorated.Then = function (postProcess) {
        return (0, exports.Then)(this, postProcess);
    };
    return fDecorated;
};
exports.Fun = Fun;
const pickMany = (entity, props) => {
    return props.reduce((s, prop) => (s[prop] = entity[prop], s), {});
};
exports.pickMany = pickMany;
