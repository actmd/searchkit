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
var PropTypes = require("prop-types");
var core_1 = require("../../../../core");
var lodash_1 = require("lodash");
var InitialViewDisplay = (function (_super) {
    __extends(InitialViewDisplay, _super);
    function InitialViewDisplay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitialViewDisplay.prototype.render = function () {
        return (React.createElement("div", { className: this.props.bemBlocks.container() },
            React.createElement("div", { "data-qa": "initial-loading", className: this.props.bemBlocks.container("initial-loading") })));
    };
    return InitialViewDisplay;
}(React.Component));
InitialViewDisplay = __decorate([
    core_1.PureRender
], InitialViewDisplay);
exports.InitialViewDisplay = InitialViewDisplay;
var InitialLoader = (function (_super) {
    __extends(InitialLoader, _super);
    function InitialLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitialLoader.prototype.defineBEMBlocks = function () {
        var block = (this.props.mod || "sk-initial-loader");
        return {
            container: block
        };
    };
    InitialLoader.prototype.render = function () {
        if (this.isInitialLoading()) {
            return core_1.renderComponent(this.props.component, {
                bemBlocks: this.bemBlocks
            });
        }
        return null;
    };
    return InitialLoader;
}(core_1.SearchkitComponent));
InitialLoader.defaultProps = {
    component: InitialViewDisplay
};
InitialLoader.propTypes = lodash_1.defaults({
    component: PropTypes.func
}, core_1.SearchkitComponent.propTypes);
exports.InitialLoader = InitialLoader;
//# sourceMappingURL=InitialLoader.js.map