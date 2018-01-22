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
var React = require("react");
var moment = require("moment");
var core_1 = require("../../../../core");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var displayFormat = 'DD MMM YYYY';
var searchkitFormat = "DD.MM.YYYY";
var FilterItem = (function (_super) {
    __extends(FilterItem, _super);
    function FilterItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterItem.prototype.render = function () {
        var props = this.props;
        return (React.createElement("div", { className: props.bemBlocks.option()
                .mix(props.bemBlocks.container("item"))
                .mix("selected-filter--" + props.filterId)() },
            React.createElement("div", { className: props.bemBlocks.option("name") },
                props.labelKey,
                ": ",
                props.labelValue),
            React.createElement(core_1.FastClick, { handler: props.removeFilter },
                React.createElement("div", { className: props.bemBlocks.option("remove-action") }, "x"))));
    };
    return FilterItem;
}(React.Component));
exports.FilterItem = FilterItem;
var SelectedFilters = (function (_super) {
    __extends(SelectedFilters, _super);
    function SelectedFilters(props) {
        var _this = _super.call(this, props) || this;
        _this.translate = _this.translate.bind(_this);
        return _this;
    }
    SelectedFilters.prototype.defineBEMBlocks = function () {
        var blockName = (this.props.mod || "sk-selected-filters");
        return {
            container: blockName,
            option: blockName + "-option"
        };
    };
    SelectedFilters.prototype.getFilters = function () {
        return this.getQuery().getSelectedFilters();
    };
    SelectedFilters.prototype.hasFilters = function () {
        return lodash_2.size(this.getFilters()) > 0;
    };
    SelectedFilters.prototype.renderFilter = function (filter) {
        var filterValue = this.translateFilterValue(filter.value, filter.id);
        return core_1.renderComponent(this.props.itemComponent, {
            key: filter.name + '$$' + filterValue,
            bemBlocks: this.bemBlocks,
            filterId: filter.id,
            labelKey: this.translate(filter.name),
            labelValue: this.translate(filterValue),
            removeFilter: this.removeFilter.bind(this, filter),
            translate: this.translate
        });
    };
    SelectedFilters.prototype.translateFilterValue = function (filterValue, filterId) {
        if (filterId == "range_due_at") {
            return this.formatDate(filterValue);
        }
        else {
            return filterValue;
        }
    };
    ;
    SelectedFilters.prototype.formatDate = function (dateString) {
        var dateArray = dateString.split(" – ");
        return this.fromSearchkitToDisplayDate(dateArray[0]) + " - " + this.fromSearchkitToDisplayDate(dateArray[1]);
    };
    ;
    SelectedFilters.prototype.fromSearchkitToDisplayDate = function (dateString) {
        return moment(dateString, searchkitFormat).format(displayFormat);
    };
    ;
    SelectedFilters.prototype.removeFilter = function (filter) {
        filter.remove();
        this.searchkit.performSearch();
    };
    SelectedFilters.prototype.render = function () {
        if (!this.hasFilters()) {
            return null;
        }
        return (React.createElement("div", { className: this.bemBlocks.container() }, lodash_3.map(this.getFilters(), this.renderFilter.bind(this))));
    };
    return SelectedFilters;
}(core_1.SearchkitComponent));
SelectedFilters.propTypes = lodash_1.defaults({}, core_1.SearchkitComponent.propTypes);
SelectedFilters.defaultProps = {
    itemComponent: FilterItem
};
exports.SelectedFilters = SelectedFilters;
//# sourceMappingURL=SelectedFilters.js.map