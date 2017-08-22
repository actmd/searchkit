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
var _1 = require("../../../");
function itemRenderer(props) {
    var bemBlocks = props.bemBlocks, onClick = props.onClick, active = props.active, disabled = props.disabled, style = props.style, itemKey = props.itemKey, label = props.label, count = props.count, showCount = props.showCount, showCheckbox = props.showCheckbox;
    var block = bemBlocks.option;
    var className = block()
        .state({ active: active, disabled: disabled })
        .mix(bemBlocks.container("item"));
    var hasCount = showCount && (count != undefined) && (count != null);
    return (React.createElement(_1.FastClick, { handler: onClick },
        React.createElement("div", { className: className, style: style, "data-qa": "option", "data-key": itemKey },
            showCheckbox ? React.createElement("input", { type: "checkbox", "data-qa": "checkbox", checked: active, readOnly: true, className: block("checkbox").state({ active: active }) }) : undefined,
            React.createElement("div", { "data-qa": "label", className: block("text") }, label),
            hasCount ? React.createElement("div", { "data-qa": "count", className: block("count") }, count) : undefined)));
}
var ItemComponent = (function (_super) {
    __extends(ItemComponent, _super);
    function ItemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemComponent.prototype.render = function () {
        return itemRenderer(this.props);
    };
    return ItemComponent;
}(React.Component));
ItemComponent.defaultProps = {
    showCount: true,
    showCheckbox: false
};
ItemComponent = __decorate([
    _1.PureRender
], ItemComponent);
exports.ItemComponent = ItemComponent;
var CheckboxItemComponent = (function (_super) {
    __extends(CheckboxItemComponent, _super);
    function CheckboxItemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxItemComponent.prototype.render = function () {
        return itemRenderer(this.props);
    };
    return CheckboxItemComponent;
}(React.Component));
CheckboxItemComponent.defaultProps = {
    showCount: true,
    showCheckbox: true
};
CheckboxItemComponent = __decorate([
    _1.PureRender
], CheckboxItemComponent);
exports.CheckboxItemComponent = CheckboxItemComponent;
//# sourceMappingURL=ItemComponents.js.map