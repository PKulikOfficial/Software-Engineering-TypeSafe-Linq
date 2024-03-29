"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyQuery = exports.Query = void 0;
const table_1 = require("./table");
const utils_1 = require("../utils/utils");
const Query = (Data, Result) => ({
    Data: Data,
    Result: Result,
    Select: function (...props) {
        let newdata = Data.map(r => (0, utils_1.pickMany)(r, props));
        let outputData = [];
        let newObj = null;
        for (var i = 0; i < Result.length; i++) {
            newObj = Object.assign({}, Result[i], newdata[i]);
            outputData = [...outputData, newObj];
        }
        return (0, exports.Query)(Data, outputData);
    },
    Include: function (prop, query) {
        let subquery = Data.map(e => ({ [prop]: query((0, table_1.Table)(e[prop])) }));
        let subqueryData = [];
        for (var i = 0; i < subquery.length; i++) {
            subqueryData = [[subquery[i][prop.toString()].Result], ...subqueryData];
        }
        subqueryData.reverse();
        let finaldata = [];
        let newObj = null;
        for (var j = 0; j < subquery.length; j++) {
            newObj = Object.assign({}, Result[j], { [prop]: subqueryData[j][0] });
            finaldata = [...finaldata, newObj];
        }
        return (0, exports.Query)(Data, finaldata);
    }
});
exports.Query = Query;
const LazyQuery = (query) => ({
    Data: (_) => query(_).Data,
    From: (array) => query(array).Result,
    Select: (...props) => (0, exports.LazyQuery)(query.Then((0, utils_1.Fun)(array => array.Select(...props)))),
    Include: (prop, subquery) => (0, exports.LazyQuery)(query.Then((0, utils_1.Fun)(array => array.Include(prop, subquery))))
});
exports.LazyQuery = LazyQuery;
