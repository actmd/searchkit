"use strict";
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var Utils = (function () {
    function Utils() {
    }
    Utils.guid = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        var id = ++Utils.guidCounter;
        return prefix.toString() + id;
    };
    Utils.collapse = function (collection, seed) {
        var reducer = function (current, fn) { return fn(current); };
        return lodash_1.reduce(collection, reducer, seed);
    };
    Utils.instanceOf = function (klass) {
        return function (val) { return val instanceof klass; };
    };
    Utils.interpolate = function (str, interpolations) {
        return str.replace(/{([^{}]*)}/g, function (a, b) {
            var r = interpolations[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        });
    };
    Utils.translate = function (key, interpolations) {
        if (interpolations) {
            return Utils.interpolate(key, interpolations);
        }
        else {
            return key;
        }
    };
    Utils.computeOptionKeys = function (options, fields, defaultKey) {
        return lodash_2.map(options, function (option) {
            return Utils.generateKeyFromFields(option, fields, defaultKey);
        });
    };
    Utils.generateKeyFromFields = function (ob, fields, defaultKey) {
        if (ob.key) {
            return ob;
        }
        var fieldValues = lodash_3.reject(lodash_2.map(fields, function (field) { return ob[field]; }), lodash_4.isUndefined);
        if (fieldValues.length > 0) {
            ob.key = fieldValues.join("_");
        }
        else {
            ob.key = defaultKey;
        }
        return ob;
    };
    return Utils;
}());
Utils.guidCounter = 0;
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map