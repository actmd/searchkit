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
var _this = this;
var React = require("react");
var PropTypes = require("prop-types");
var enzyme_1 = require("enzyme");
var TestHelpers_1 = require("../../../components/__test__/TestHelpers");
var components_1 = require("../../../components");
var _1 = require("../../../");
describe("RenderComponent", function () {
    beforeEach(function () {
        _this.SubPanel = (function (_super) {
            __extends(SubPanel, _super);
            function SubPanel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SubPanel;
        }(components_1.Panel));
        _this.SubPanel.defaultProps.title = "SubPanel";
        _this.SubPanelElement = React.createElement(components_1.Panel, { title: "PanelElement" });
        _this.PanelReactClass = React.createClass({
            contextTypes: {
                color: PropTypes.string
            },
            render: function () {
                return (React.createElement(components_1.Panel, __assign({ title: "PanelReactClass " + this.context.color }, this.props), this.props.children));
            }
        });
        _this.PanelFunction = function (props, context) {
            return (React.createElement(components_1.Panel, { title: "PanelFunction " + context.color }, props.children));
        };
        _this.PanelFunction.contextTypes = {
            color: PropTypes.string
        };
        var Provider = (function (_super) {
            __extends(Provider, _super);
            function Provider() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Provider.prototype.getChildContext = function () {
                return { color: "purple" };
            };
            Provider.prototype.render = function () {
                return this.props.children;
            };
            return Provider;
        }(React.Component));
        Provider.childContextTypes = {
            color: PropTypes.string
        };
        _this.mount = function (component, props) {
            if (props === void 0) { props = {}; }
            _this.wrapper = enzyme_1.mount(React.createElement(Provider, null, _1.renderComponent(component, props, React.createElement("p", null, "content.."))));
        };
    });
    it("React.Component class", function () {
        _this.mount(_this.SubPanel);
        expect(_this.wrapper.html()).toEqual(TestHelpers_1.jsxToHTML(React.createElement("div", { className: "sk-panel" },
            React.createElement("div", { className: "sk-panel__header" }, "SubPanel"),
            React.createElement("div", { className: "sk-panel__content" },
                React.createElement("p", null, "content..")))));
    });
    it("React Element", function () {
        _this.mount(_this.SubPanelElement);
        expect(_this.wrapper.html()).toEqual(TestHelpers_1.jsxToHTML(React.createElement("div", { className: "sk-panel" },
            React.createElement("div", { className: "sk-panel__header" }, "PanelElement"),
            React.createElement("div", { className: "sk-panel__content" },
                React.createElement("p", null, "content..")))));
    });
    it("React Class", function () {
        _this.mount(_this.PanelReactClass);
        expect(_this.wrapper.html()).toEqual(TestHelpers_1.jsxToHTML(React.createElement("div", { className: "sk-panel" },
            React.createElement("div", { className: "sk-panel__header" }, "PanelReactClass purple"),
            React.createElement("div", { className: "sk-panel__content" },
                React.createElement("p", null, "content..")))));
    });
    it("Render function", function () {
        _this.mount(_this.PanelFunction);
        expect(_this.wrapper.html()).toEqual(TestHelpers_1.jsxToHTML(React.createElement("div", { className: "sk-panel" },
            React.createElement("div", { className: "sk-panel__header" }, "PanelFunction purple"),
            React.createElement("div", { className: "sk-panel__content" },
                React.createElement("p", null, "content..")))));
    });
    it("Invalid component", function () {
        spyOn(console, "warn");
        try {
            _this.mount(10);
        }
        catch (e) {
        }
        expect(console.warn).toHaveBeenCalledWith("Invalid component", 10);
    });
});
//# sourceMappingURL=RenderComponentSpec.js.map