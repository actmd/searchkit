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
var bemBlock = require("bem-cn");
var TogglePanel = (function (_super) {
    __extends(TogglePanel, _super);
    function TogglePanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            collapsed: props.collapsable
        };
        return _this;
    }
    TogglePanel.prototype.toggleCollapsed = function () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    TogglePanel.prototype.componentDidMount = function () {
        console.log('componentDidMount');
    };
    TogglePanel.prototype.componentWillUnmount = function () {
        console.log('componentWillUnmount');
    };
    TogglePanel.prototype.render = function () {
        var _a = this.props, title = _a.title, mod = _a.mod, className = _a.className, disabled = _a.disabled, children = _a.children, collapsable = _a.collapsable, rightComponent = _a.rightComponent;
        var collapsed = this.state.collapsed;
        var bemBlocks = {
            container: bemBlock(mod)
        };
        var block = bemBlocks.container;
        var containerClass = block()
            .mix(className)
            .state({ disabled: disabled });
        var titleDiv;
        if (collapsable) {
            var arrowClass = collapsed ? 'sk-arrow-right' : 'sk-arrow-down';
            titleDiv = (React.createElement("div", { className: block("header").state({ collapsable: collapsable }), onClick: this.toggleCollapsed.bind(this) },
                rightComponent ? React.createElement("div", { style: { float: 'right' } }, rightComponent) : undefined,
                React.createElement("span", { className: arrowClass }),
                "\u00A0",
                title));
        }
        else {
            titleDiv = (React.createElement("div", { className: block("header") },
                rightComponent ? React.createElement("div", { style: { float: 'right' } }, rightComponent) : undefined,
                title));
        }
        return (React.createElement("div", { className: containerClass },
            titleDiv,
            React.createElement("div", { className: block("content").state({ collapsed: collapsed }) }, children)));
    };
    return TogglePanel;
}(React.Component));
TogglePanel.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    mod: PropTypes.string,
    className: PropTypes.string,
    collapsable: PropTypes.bool,
};
TogglePanel.defaultProps = {
    disabled: false,
    collapsable: false,
    mod: "sk-panel"
};
exports.TogglePanel = TogglePanel;
//# sourceMappingURL=TogglePanel.js.map