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
var ui_1 = require("../../../ui");
var FacetFilter_1 = require("./FacetFilter");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var FacetFilterProps_1 = require("./FacetFilterProps");
var allItem = {
    key: "$all", label: "All"
};
var MenuFilter = (function (_super) {
    __extends(MenuFilter, _super);
    function MenuFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuFilter.prototype.toggleFilter = function (option) {
        if (option === allItem.key || this.accessor.state.contains(option)) {
            this.accessor.state = this.accessor.state.clear();
        }
        else {
            this.accessor.state = this.accessor.state.setValue([option]);
        }
        this.searchkit.performSearch();
    };
    MenuFilter.prototype.setFilters = function (options) {
        this.toggleFilter(options[0]);
    };
    MenuFilter.prototype.getSelectedItems = function () {
        var selectedValue = this.accessor.state.getValue()[0];
        return [!lodash_3.isUndefined(selectedValue) ? selectedValue : allItem.key];
    };
    MenuFilter.prototype.getItems = function () {
        var all = {
            key: allItem.key,
            label: allItem.label,
            doc_count: this.accessor.getDocCount()
        };
        return lodash_2.concat([all], _super.prototype.getItems.call(this));
    };
    return MenuFilter;
}(FacetFilter_1.FacetFilter));
MenuFilter.propTypes = lodash_1.defaults({}, FacetFilterProps_1.FacetFilterPropTypes.propTypes);
MenuFilter.defaultProps = lodash_1.defaults({
    listComponent: ui_1.ItemList,
    operator: "OR"
}, FacetFilter_1.FacetFilter.defaultProps);
exports.MenuFilter = MenuFilter;
//# sourceMappingURL=MenuFilter.js.map