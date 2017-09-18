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
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
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
    MenuRefinementListFilter.prototype.onSelect = function (value, childKey, childValue) {
        this.accessor.state = this.accessor.state.toggle((_a = {},
            _a[this.props.id] = value,
            _a[childKey] = childValue,
            _a));
        this.searchkit.performSearch();
        var _a;
    };
    MenuRefinementListFilter.prototype.getSelectedItemsInBucket = function (bucket, childKey) {
        var _this = this;
        var selectedItems = this.accessor.state.getValue(), bucketItems = lodash_1.filter(selectedItems, function (item) {
            return lodash_2.get(item, [_this.props.id]) == bucket;
        });
        return bucketItems ? bucketItems.map(function (i) { return i[childKey]; }) : [];
    };
    MenuRefinementListFilter.prototype.getSelectedItems = function () {
        return this.accessor.state.getValue();
    };
    MenuRefinementListFilter.prototype.render = function () {
        var _a = this.props, listComponent = _a.listComponent, containerComponent = _a.containerComponent, showCount = _a.showCount, title = _a.title, id = _a.id, countFormatter = _a.countFormatter;
        return core_1.renderComponent(containerComponent, {
            title: title,
            className: id ? "filter--" + id : undefined,
            disabled: !this.hasOptions()
        }, [
            core_1.renderComponent(listComponent, {
                key: "listComponent",
                items: this.getItems(),
                itemComponent: this.props.itemComponent,
                selectedItems: this.getSelectedItems(),
                toggleItem: this.toggleFilter.bind(this),
                setItems: this.setFilters.bind(this),
                docCount: this.accessor.getDocCount(),
                showCount: showCount,
                translate: this.translate,
                countFormatter: countFormatter,
                onSelect: this.onSelect.bind(this),
                getSelectedItems: this.getSelectedItemsInBucket.bind(this)
            }),
            this.renderShowMore()
        ]);
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
    ChildRefinementListFilter.prototype.toggleFilter = function (key) {
        this.props.onSelect(this.props.title, this.props.id, key);
    };
    ChildRefinementListFilter.prototype.getSelectedItems = function () {
        return this.props.getSelectedItems(this.props.title, this.props.id);
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
            option = { size: 100, label: accessor.translate("facets.view_all") };
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