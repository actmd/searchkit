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
var _1 = require(".");
var __1 = require("..");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var query_1 = require("../query");
var MultiFieldFacetAccessor = (function (_super) {
    __extends(MultiFieldFacetAccessor, _super);
    function MultiFieldFacetAccessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiFieldFacetAccessor.prototype._getPath = function (key, path) {
        var getPath = path ? [key].concat(path) : [key];
        return [this.uuid].concat(this.fieldContext.getAggregationPath(), getPath, ["buckets"]);
    };
    MultiFieldFacetAccessor.prototype.getBuckets = function (path) {
        if (path === void 0) { path = []; }
        var getPath = this._getPath(this.key, path);
        return this.getAggregations(getPath, []);
    };
    MultiFieldFacetAccessor.prototype.buildOwnQuery = function (query) {
        if (!this.loadAggregations) {
            return query;
        }
        else {
            var excludedKey = (this.isOrOperator()) ? this.key : undefined;
            return query.setAggs(__1.FilterBucket.apply(void 0, [this.uuid,
                query.getFiltersWithoutKeys(excludedKey)].concat(this.fieldContext.wrapAggregations(this.buildAggregations(query), query_1.CardinalityMetric(this.key + "_count", this.key)))));
        }
    };
    MultiFieldFacetAccessor.prototype.buildAggregations = function (query) {
        var _this = this;
        var options = [].concat(this.options.fields).reverse();
        return lodash_3.reduce(options, function (result, field, i) {
            var terms = __1.TermsBucket(field, field, lodash_1.omitBy({
                size: _this.size,
                order: _this.getOrder(),
                include: _this.options.include,
                exclude: _this.options.exclude,
                min_doc_count: _this.options.min_doc_count
            }, lodash_2.isUndefined), result);
            if (field == _this.key) {
                return terms;
            }
            return [
                terms,
                query_1.CardinalityMetric(field + "_count", field)
            ];
        }, {});
    };
    return MultiFieldFacetAccessor;
}(_1.FacetAccessor));
exports.MultiFieldFacetAccessor = MultiFieldFacetAccessor;
//# sourceMappingURL=MultiFieldFacetAccessor.js.map