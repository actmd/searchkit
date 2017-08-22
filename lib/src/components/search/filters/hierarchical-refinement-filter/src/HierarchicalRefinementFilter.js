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
var PropTypes = require("prop-types");
var core_1 = require("../../../../../core");
var lodash_1 = require("lodash");
var HierarchicalRefinementFilter = (function (_super) {
    __extends(HierarchicalRefinementFilter, _super);
    function HierarchicalRefinementFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HierarchicalRefinementFilter.prototype.defineBEMBlocks = function () {
        var blockClass = this.props.mod || "sk-hierarchical-refinement";
        return {
            container: blockClass + "-list",
            option: blockClass + "-option"
        };
    };
    HierarchicalRefinementFilter.prototype.defineAccessor = function () {
        var _a = this.props, field = _a.field, id = _a.id, title = _a.title, size = _a.size, orderKey = _a.orderKey, orderDirection = _a.orderDirection, startLevel = _a.startLevel;
        return new core_1.NestedFacetAccessor(id, {
            field: field,
            id: id,
            title: title,
            size: size,
            orderKey: orderKey,
            orderDirection: orderDirection,
            startLevel: startLevel
        });
    };
    HierarchicalRefinementFilter.prototype.addFilter = function (level, option) {
        this.accessor.state = this.accessor.state.toggleLevel(level, option.key);
        this.searchkit.performSearch();
    };
    HierarchicalRefinementFilter.prototype.renderOption = function (level, option) {
        var _this = this;
        var block = this.bemBlocks.option;
        var isSelected = this.accessor.resultsState.contains(level, option.key);
        var countFormatter = this.props.countFormatter;
        var className = block().state({
            selected: isSelected
        });
        return (React.createElement("div", { key: option.key },
            React.createElement(core_1.FastClick, { handler: this.addFilter.bind(this, level, option) },
                React.createElement("div", { className: className },
                    React.createElement("div", { className: block("text") }, this.translate(option.key)),
                    React.createElement("div", { className: block("count") }, countFormatter(option.doc_count)))),
            (function () {
                if (isSelected) {
                    return _this.renderOptions(level + 1);
                }
            })()));
    };
    HierarchicalRefinementFilter.prototype.renderOptions = function (level) {
        var block = this.bemBlocks.container;
        return (React.createElement("div", { className: block("hierarchical-options") }, lodash_1.map(this.accessor.getBuckets(level), this.renderOption.bind(this, level))));
    };
    HierarchicalRefinementFilter.prototype.render = function () {
        var block = this.bemBlocks.container;
        var disabled = this.accessor.getBuckets(0).length === 0;
        var className = block().mix("filter--" + this.props.id)
            .state({ disabled: disabled });
        return (React.createElement("div", { "data-qa": "filter--" + this.props.id, className: className },
            React.createElement("div", { "data-qa": "title", className: block("header") }, this.props.title),
            React.createElement("div", { "data-qa": "options", className: block("root") }, this.renderOptions(0))));
    };
    return HierarchicalRefinementFilter;
}(core_1.SearchkitComponent));
HierarchicalRefinementFilter.defaultProps = {
    countFormatter: lodash_1.identity
};
HierarchicalRefinementFilter.propTypes = lodash_1.defaults({
    field: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    orderKey: PropTypes.string,
    orderDirection: PropTypes.oneOf(["asc", "desc"]),
    startLevel: PropTypes.number,
    countFormatter: PropTypes.func
}, core_1.SearchkitComponent.propTypes);
exports.HierarchicalRefinementFilter = HierarchicalRefinementFilter;
//# sourceMappingURL=HierarchicalRefinementFilter.js.map