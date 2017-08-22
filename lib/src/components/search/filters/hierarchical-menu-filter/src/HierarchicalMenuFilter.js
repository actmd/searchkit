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
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var HierarchicalMenuFilter = (function (_super) {
    __extends(HierarchicalMenuFilter, _super);
    function HierarchicalMenuFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HierarchicalMenuFilter.prototype.defineBEMBlocks = function () {
        var blockClass = this.props.mod || "sk-hierarchical-menu";
        return {
            container: blockClass + "-list",
            option: blockClass + "-option"
        };
    };
    HierarchicalMenuFilter.prototype.defineAccessor = function () {
        var _a = this.props, id = _a.id, title = _a.title, fields = _a.fields, size = _a.size, orderKey = _a.orderKey, orderDirection = _a.orderDirection;
        return new core_1.HierarchicalFacetAccessor(id, {
            id: id, title: title, fields: fields, size: size, orderKey: orderKey, orderDirection: orderDirection
        });
    };
    HierarchicalMenuFilter.prototype.addFilter = function (option, level) {
        this.accessor.state = this.accessor.state.toggleLevel(level, option.key);
        this.searchkit.performSearch();
    };
    HierarchicalMenuFilter.prototype.renderOption = function (level, option) {
        var _this = this;
        var block = this.bemBlocks.option;
        var countFormatter = this.props.countFormatter;
        var className = block().state({
            selected: this.accessor.state.contains(level, option.key)
        });
        return (React.createElement("div", { key: option.key },
            React.createElement(core_1.FastClick, { handler: this.addFilter.bind(this, option, level) },
                React.createElement("div", { className: className },
                    React.createElement("div", { className: block("text") }, this.translate(option.key)),
                    React.createElement("div", { className: block("count") }, countFormatter(option.doc_count)))),
            (function () {
                if (_this.accessor.resultsState.contains(level, option.key)) {
                    return _this.renderOptions(level + 1);
                }
            })()));
    };
    HierarchicalMenuFilter.prototype.renderOptions = function (level) {
        var block = this.bemBlocks.container;
        return (React.createElement("div", { className: block("hierarchical-options") }, lodash_2.map(this.accessor.getBuckets(level), this.renderOption.bind(this, level))));
    };
    HierarchicalMenuFilter.prototype.render = function () {
        var block = this.bemBlocks.container;
        var classname = block()
            .mix("filter--" + this.props.id)
            .state({
            disabled: this.accessor.getBuckets(0).length == 0
        });
        return (React.createElement("div", { className: classname },
            React.createElement("div", { className: block("header") }, this.props.title),
            React.createElement("div", { className: block("root") }, this.renderOptions(0))));
    };
    return HierarchicalMenuFilter;
}(core_1.SearchkitComponent));
HierarchicalMenuFilter.defaultProps = {
    countFormatter: lodash_3.identity,
    size: 20
};
HierarchicalMenuFilter.propTypes = lodash_1.defaults({
    id: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    orderKey: PropTypes.string,
    orderDirection: PropTypes.oneOf(["asc", "desc"]),
    countFormatter: PropTypes.func
}, core_1.SearchkitComponent.propTypes);
exports.HierarchicalMenuFilter = HierarchicalMenuFilter;
//# sourceMappingURL=HierarchicalMenuFilter.js.map