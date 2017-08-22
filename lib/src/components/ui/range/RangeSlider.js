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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var lodash_1 = require("lodash");
var Slider = require('rc-slider');
var createSliderWithTooltip = Slider.createSliderWithTooltip;
var Range = createSliderWithTooltip(Slider.Range);
var block = require("bem-cn");
var pure_render_1 = require("../../../core/react/pure-render");
var RangeSlider = (function (_super) {
    __extends(RangeSlider, _super);
    function RangeSlider(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = _this.onChange.bind(_this);
        _this.onFinished = _this.onFinished.bind(_this);
        return _this;
    }
    RangeSlider.prototype.onChange = function (_a) {
        var min = _a[0], max = _a[1];
        this.props.onChange({ min: min, max: max });
    };
    RangeSlider.prototype.onFinished = function (_a) {
        var min = _a[0], max = _a[1];
        this.props.onFinished({ min: min, max: max });
    };
    RangeSlider.prototype.render = function () {
        var _a = this.props, mod = _a.mod, className = _a.className, step = _a.step, marks = _a.marks, rangeFormatter = _a.rangeFormatter, min = _a.min, max = _a.max, minValue = _a.minValue, maxValue = _a.maxValue;
        var bemBlocks = {
            container: block(mod)
        };
        return (React.createElement("div", { className: bemBlocks.container().mix(className) },
            React.createElement(Range, { min: min, max: max, marks: marks || (_b = {},
                    _b[min] = rangeFormatter(min),
                    _b[max] = rangeFormatter(max),
                    _b), tipFormatter: rangeFormatter, range: true, step: step, value: [minValue, maxValue], onChange: this.onChange, onAfterChange: this.onFinished })));
        var _b;
    };
    return RangeSlider;
}(React.Component));
RangeSlider.defaultProps = {
    mod: "sk-range-slider",
    rangeFormatter: lodash_1.identity
};
RangeSlider = __decorate([
    pure_render_1.PureRender,
    __metadata("design:paramtypes", [Object])
], RangeSlider);
exports.RangeSlider = RangeSlider;
//# sourceMappingURL=RangeSlider.js.map