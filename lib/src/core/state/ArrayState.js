"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var State_1 = require("./State");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var lodash_5 = require("lodash");
var ArrayState = (function (_super) {
    __extends(ArrayState, _super);
    function ArrayState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayState.prototype.getValue = function () {
        return this.value || [];
    };
    ArrayState.prototype.toggle = function (val) {
        var resolvedValue = this.resolveValue(this.value, val);
        if (this.contains(resolvedValue)) {
            return this.remove(resolvedValue);
        }
        else {
            return this.add(resolvedValue);
        }
    };
    ArrayState.prototype.clear = function () {
        return this.create([]);
    };
    ArrayState.prototype.remove = function (val) {
        return this.create(lodash_2.without(this.getValue(), val));
    };
    ArrayState.prototype.add = function (val) {
        return this.create(this.getValue().concat(val));
    };
    ArrayState.prototype.resolveValue = function (currentState, val) {
        if (lodash_5.isObject(val)) {
            var resolvedVal = lodash_3.find(currentState, function (item) { return lodash_4.isEqual(item, val); });
            return resolvedVal || val;
        }
        return val;
    };
    ArrayState.prototype.contains = function (val) {
        return lodash_1.indexOf(this.value, val) !== -1;
    };
    return ArrayState;
}(State_1.State));
exports.ArrayState = ArrayState;
//# sourceMappingURL=ArrayState.js.map