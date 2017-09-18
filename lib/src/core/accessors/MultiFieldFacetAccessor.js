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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _1 = require(".");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var lodash_5 = require("lodash");
var query_1 = require("../query");
var lodash_6 = require("lodash");
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
            return query.setAggs(query_1.FilterBucket.apply(void 0, [this.uuid,
                query.getFiltersWithoutKeys(excludedKey)].concat(this.fieldContext.wrapAggregations(this.buildAggregations(query), query_1.CardinalityMetric(this.key + "_count", this.key)))));
        }
    };
    MultiFieldFacetAccessor.prototype.buildAggregations = function (query) {
        var _this = this;
        var options = [].concat(this.options.fields).reverse();
        return lodash_3.reduce(options, function (result, field, i) {
            var accessor = _this.searchkit.accessors.statefulAccessors[field];
            var terms = query_1.TermsBucket(field, field, lodash_1.omitBy({
                size: accessor.size,
                order: accessor.getOrder(),
                include: accessor.options.include,
                exclude: accessor.options.exclude,
                min_doc_count: accessor.options.min_doc_count
            }, lodash_2.isUndefined), result);
            if (field == _this.key) {
                return terms;
            }
            var cardinality = query_1.CardinalityMetric(field + "_count", field);
            return __assign({}, terms, cardinality);
        }, {});
    };
    MultiFieldFacetAccessor.prototype.createNestedQuery = function (filters) {
        var filterTerms = lodash_6.map(filters, function (filter) {
            var filterKeys = lodash_4.keys(filter);
            return {
                bool: {
                    filter: filterKeys.map(function (k) {
                        return query_1.TermQuery(k, filter[k]);
                    })
                }
            };
        });
        return this.fieldContext.wrapFilter({
            bool: {
                should: filterTerms
            }
        });
    };
    MultiFieldFacetAccessor.prototype.buildSharedQuery = function (query) {
        var _this = this;
        var filters = this.state.getValue();
        if (filters.length > 0) {
            var groupedFilters = lodash_5.groupBy(filters, function (f) { return f[_this.key]; }), filterTerms = {
                bool: {
                    filter: lodash_6.map(groupedFilters, this.createNestedQuery.bind(this))
                }
            };
            var selectedFilters = lodash_6.map(filters, function (filter) {
                return {
                    name: _this.options.title || _this.translate(_this.key),
                    value: _this.translate(filter),
                    id: _this.options.id,
                    remove: function () { return _this.state = _this.state.remove(filter); }
                };
            });
            query = query.addFilter(this.uuid, filterTerms)
                .addSelectedFilters(selectedFilters);
        }
        return query;
    };
    return MultiFieldFacetAccessor;
}(_1.FacetAccessor));
exports.MultiFieldFacetAccessor = MultiFieldFacetAccessor;
//# sourceMappingURL=MultiFieldFacetAccessor.js.map