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
var MenuFilter_1 = require("./MenuFilter");
var core_1 = require("../../../../core");
var MenuRefinementListFilter = (function (_super) {
    __extends(MenuRefinementListFilter, _super);
    function MenuRefinementListFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuRefinementListFilter.prototype.defineAccessor = function () {
        return new core_1.MultiFieldFacetAccessor(this.props.id, __assign({}, this.props, this.getAccessorOptions()));
    };
    return MenuRefinementListFilter;
}(MenuFilter_1.MenuFilter));
exports.MenuRefinementListFilter = MenuRefinementListFilter;
//# sourceMappingURL=MenuRefinementListFilter.js.map