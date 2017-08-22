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
var lodash_2 = require("lodash");
var HitItem = (function (_super) {
    __extends(HitItem, _super);
    function HitItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HitItem.prototype.render = function () {
        return (React.createElement("div", { "data-qa": "hit", className: this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item")) }, this.props.result._id));
    };
    return HitItem;
}(React.Component));
HitItem = __decorate([
    core_1.PureRender
], HitItem);
exports.HitItem = HitItem;
var HitsList = (function (_super) {
    __extends(HitsList, _super);
    function HitsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HitsList.prototype.render = function () {
        var _a = this.props, hits = _a.hits, mod = _a.mod, className = _a.className, itemComponent = _a.itemComponent;
        var bemBlocks = {
            container: core_1.block(mod),
            item: core_1.block(mod + "-hit")
        };
        return (React.createElement("div", { "data-qa": "hits", className: bemBlocks.container().mix(className) }, lodash_1.map(hits, function (result, index) {
            return core_1.renderComponent(itemComponent, {
                key: result._id, result: result, bemBlocks: bemBlocks, index: index
            });
        })));
    };
    return HitsList;
}(React.Component));
HitsList.defaultProps = {
    mod: "sk-hits",
    itemComponent: HitItem
};
HitsList.propTypes = {
    mod: PropTypes.string,
    className: PropTypes.string,
    itemComponent: core_1.RenderComponentPropType,
    hits: PropTypes.any
};
HitsList = __decorate([
    core_1.PureRender
], HitsList);
exports.HitsList = HitsList;
var Hits = (function (_super) {
    __extends(Hits, _super);
    function Hits() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hits.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        if (this.props.highlightFields) {
            this.searchkit.addAccessor(new core_1.HighlightAccessor(this.props.highlightFields));
        }
        if (this.props.customHighlight) {
            this.searchkit.addAccessor(new core_1.CustomHighlightAccessor(this.props.customHighlight));
        }
        if (this.props.sourceFilter) {
            this.searchkit.addAccessor(new core_1.SourceFilterAccessor(this.props.sourceFilter));
        }
        this.hitsAccessor = new core_1.HitsAccessor({ scrollTo: this.props.scrollTo });
        this.searchkit.addAccessor(this.hitsAccessor);
    };
    Hits.prototype.defineAccessor = function () {
        return new core_1.PageSizeAccessor(this.props.hitsPerPage);
    };
    Hits.prototype.render = function () {
        var hits = this.getHits();
        var hasHits = hits.length > 0;
        if (!this.isInitialLoading() && hasHits) {
            var _a = this.props, listComponent = _a.listComponent, mod = _a.mod, className = _a.className, itemComponent = _a.itemComponent;
            return core_1.renderComponent(listComponent, {
                hits: hits, mod: mod, className: className, itemComponent: itemComponent
            });
        }
        return null;
    };
    return Hits;
}(core_1.SearchkitComponent));
Hits.propTypes = lodash_2.defaults({
    hitsPerPage: PropTypes.number.isRequired,
    highlightFields: PropTypes.arrayOf(PropTypes.string),
    sourceFilterType: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.bool
    ]),
    itemComponent: core_1.RenderComponentPropType,
    listComponent: core_1.RenderComponentPropType
}, core_1.SearchkitComponent.propTypes);
Hits.defaultProps = {
    listComponent: HitsList,
    scrollTo: "body"
};
exports.Hits = Hits;
//# sourceMappingURL=Hits.js.map