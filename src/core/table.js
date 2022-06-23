"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyTable = exports.Table = void 0;
const query_1 = require("./query");
const utils_1 = require("../utils/utils");
const Table = (array) => ({
    Select: function (...props) {
        return (0, query_1.Query)(array, array.map(r => (0, utils_1.pickMany)(r, props)));
    }
});
exports.Table = Table;
const LazyTable = () => ({
    Select: (...props) => (0, query_1.LazyQuery)((0, utils_1.Fun)(array => array.Select(...props)))
});
exports.LazyTable = LazyTable;
