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
var FieldContext_1 = require("./FieldContext");
var query_dsl_1 = require("../query_dsl");
var __1 = require("..");
var NestedFilterContext = (function (_super) {
    __extends(NestedFilterContext, _super);
    function NestedFilterContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedFilterContext.prototype.wrapAggregations = function () {
        var aggregations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aggregations[_i] = arguments[_i];
        }
        return [query_dsl_1.NestedBucket("inner", this.fieldOptions.options.path, __1.FilterBucket.apply(void 0, ["inner",
                this.fieldOptions.options.filter].concat(aggregations)))];
    };
    NestedFilterContext.prototype.getAggregationPath = function () {
        return ["inner"];
    };
    NestedFilterContext.prototype.wrapFilter = function (filter) {
        return query_dsl_1.NestedQuery(this.fieldOptions.options.path, filter, this.fieldOptions.options);
    };
    return NestedFilterContext;
}(FieldContext_1.FieldContext));
exports.NestedFilterContext = NestedFilterContext;
//# sourceMappingURL=NestedFilterContext.js.map