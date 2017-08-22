"use strict";
var history_1 = require("history");
var qs = require("qs");
exports.encodeObjUrl = function (obj) {
    return qs.stringify(obj, { encode: true, encodeValuesOnly: true });
};
exports.decodeObjString = function (str) {
    return qs.parse(str);
};
exports.createHistoryInstance = function () {
    return history_1.createBrowserHistory();
};
//# sourceMappingURL=history.js.map