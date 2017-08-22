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
var core_1 = require("../../../core");
var ui_1 = require("../../ui");
var lodash_1 = require("lodash");
var ViewSwitcherToggle = (function (_super) {
    __extends(ViewSwitcherToggle, _super);
    function ViewSwitcherToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewSwitcherToggle.prototype.getViewOptionsSwitcherAccessor = function () {
        return this.searchkit.getAccessorByType(core_1.ViewOptionsAccessor);
    };
    ViewSwitcherToggle.prototype.setView = function (view) {
        this.getViewOptionsSwitcherAccessor().setView(view);
    };
    ViewSwitcherToggle.prototype.render = function () {
        var _this = this;
        var viewOptionsAccessor = this.getViewOptionsSwitcherAccessor();
        if (viewOptionsAccessor) {
            var options = viewOptionsAccessor.options;
            var selectedOption = viewOptionsAccessor.getSelectedOption().key;
            return core_1.renderComponent(this.props.listComponent, {
                mod: this.props.mod,
                className: this.props.className,
                disabled: !this.hasHits(),
                items: options,
                selectedItems: [selectedOption],
                toggleItem: this.setView.bind(this),
                setItems: function (_a) {
                    var item = _a[0];
                    return _this.setView(item);
                },
                urlBuilder: function (item) { return _this.getViewOptionsSwitcherAccessor().urlWithState(item.key); },
                translate: this.translate
            });
        }
        return null;
    };
    return ViewSwitcherToggle;
}(core_1.SearchkitComponent));
ViewSwitcherToggle.defaultProps = {
    listComponent: ui_1.Toggle
};
ViewSwitcherToggle.propTypes = lodash_1.defaults({
    listComponent: core_1.RenderComponentPropType
}, core_1.SearchkitComponent.propTypes);
exports.ViewSwitcherToggle = ViewSwitcherToggle;
//# sourceMappingURL=ViewSwitcherToggle.js.map