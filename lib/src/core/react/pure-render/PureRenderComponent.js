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
var shouldPureComponentUpdate_1 = require("./shouldPureComponentUpdate");
var PureRenderComponent = (function (_super) {
    __extends(PureRenderComponent, _super);
    function PureRenderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shouldComponentUpdate = shouldPureComponentUpdate_1.shouldPureComponentUpdate;
        return _this;
    }
    return PureRenderComponent;
}(React.Component));
exports.PureRenderComponent = PureRenderComponent;
//# sourceMappingURL=PureRenderComponent.js.map