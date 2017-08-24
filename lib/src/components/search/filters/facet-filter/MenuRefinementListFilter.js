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
var React = require("react");
var MenuFilter_1 = require("./MenuFilter");
var RefinementListFilter_1 = require("./RefinementListFilter");
var core_1 = require("../../../../core");
var MenuRefinementListFilter = (function (_super) {
    __extends(MenuRefinementListFilter, _super);
    function MenuRefinementListFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuRefinementListFilter.prototype.defineAccessor = function () {
        return new core_1.MultiFieldFacetAccessor(this.props.id, __assign({}, this.props, this.getAccessorOptions()));
    };
    return MenuRefinementListFilter;
}(MenuFilter_1.MenuFilter));
exports.MenuRefinementListFilter = MenuRefinementListFilter;
var ChildRefinementListFilter = (function (_super) {
    __extends(ChildRefinementListFilter, _super);
    function ChildRefinementListFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildRefinementListFilter.prototype.getItems = function () {
        return this.props.items;
    };
    ChildRefinementListFilter.prototype.renderShowMore = function () {
        var _this = this;
        var option = this.getMoreSizeOption();
        if (!option || !this.props.showMore) {
            return null;
        }
        return (React.createElement(core_1.FastClick, { handler: function () { return _this.toggleViewMoreOption(option); }, key: "showMore" },
            React.createElement("div", { "data-qa": "show-more", className: this.bemBlocks.container("view-more-action") }, this.translate(option.label))));
    };
    ChildRefinementListFilter.prototype.getMoreSizeOption = function () {
        var option = { size: 0, label: "" };
        var total = this.props.total, accessor = this.accessor;
        if (total <= accessor.defaultSize)
            return null;
        var size = this.getItems() ? this.getItems().length : 0;
        if (total <= size) {
            option = { size: accessor.defaultSize, label: accessor.translate("facets.view_less") };
        }
        else if (total > size) {
            option = { size: total, label: accessor.translate("facets.view_all") };
        }
        else if (total) {
            option = null;
        }
        return option;
    };
    return ChildRefinementListFilter;
}(RefinementListFilter_1.RefinementListFilter));
exports.ChildRefinementListFilter = ChildRefinementListFilter;
//# sourceMappingURL=MenuRefinementListFilter.js.map