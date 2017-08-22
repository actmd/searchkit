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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var core_1 = require("../../../../core");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
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
FilterItem = __decorate([
    core_1.PureRender
], FilterItem);
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
        return core_1.renderComponent(this.props.itemComponent, {
            key: filter.name + '$$' + filter.value,
            bemBlocks: this.bemBlocks,
            filterId: filter.id,
            labelKey: this.translate(filter.name),
            labelValue: this.translate(filter.value),
            removeFilter: this.removeFilter.bind(this, filter),
            translate: this.translate
        });
    };
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