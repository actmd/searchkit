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
var core_1 = require("../../../../core");
var ui_1 = require("../../../ui");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var bem = require("bem-cn");
var PaginationUtils_1 = require("./PaginationUtils");
var Pagination = (function (_super) {
    __extends(Pagination, _super);
    function Pagination(props) {
        var _this = _super.call(this, props) || this;
        _this.translations = Pagination.translations;
        _this.setPage = _this.setPage.bind(_this);
        return _this;
    }
    Pagination.prototype.defineAccessor = function () {
        return new core_1.PaginationAccessor("p");
    };
    Pagination.prototype.getCurrentPage = function () {
        return Number(this.accessor.state.getValue()) || 1;
    };
    Pagination.prototype.getTotalPages = function () {
        return Math.ceil(lodash_2.get(this.getResults(), "hits.total", 1)
            /
                lodash_2.get(this.getQuery(), "query.size", 10));
    };
    Pagination.prototype.isDisabled = function (pageNumber) {
        return lodash_3.isNaN(pageNumber) || (pageNumber < 1) || (pageNumber > this.getTotalPages());
    };
    Pagination.prototype.normalizePage = function (page) {
        if (page === 'previous')
            return this.getCurrentPage() - 1;
        else if (page === 'next')
            return this.getCurrentPage() + 1;
        else
            return +page;
    };
    Pagination.prototype.setPage = function (page) {
        var pageNumber = this.normalizePage(page);
        if (this.isDisabled(pageNumber)) {
            return;
        }
        ;
        if (pageNumber == this.getCurrentPage()) {
            return; // Same page, no need to rerun query
        }
        this.accessor.state = this.accessor.state.setValue(pageNumber);
        this.searchkit.performSearch();
    };
    Pagination.prototype.getPages = function () {
        var _a = this.props, showNumbers = _a.showNumbers, pageScope = _a.pageScope, showText = _a.showText;
        var currentPage = this.getCurrentPage();
        var totalPages = this.getTotalPages();
        var builder = PaginationUtils_1.Paginator.build({
            showNumbers: showNumbers, showFirst: true,
            showPrevious: showText, showNext: showText, showEllipsis: showText
        });
        return builder(currentPage, totalPages, this.translate, pageScope);
    };
    Pagination.prototype.render = function () {
        var _this = this;
        if (!this.hasHits())
            return null;
        var className = bem(this.props.mod).state({ numbered: this.props.showNumbers });
        var view = core_1.renderComponent(this.props.listComponent, {
            items: this.getPages(),
            selectedItems: [this.getCurrentPage()],
            toggleItem: this.setPage,
            setItems: function (items) {
                if (items && items.length > 0)
                    _this.setPage(items[0]);
            },
            disabled: this.getTotalPages() <= 1
        });
        return React.createElement("div", { className: className }, view);
    };
    return Pagination;
}(core_1.SearchkitComponent));
Pagination.translations = {
    "pagination.previous": "Previous",
    "pagination.next": "Next"
};
Pagination.propTypes = lodash_1.defaults({
    translations: core_1.SearchkitComponent.translationsPropType(Pagination.translations),
    listComponent: core_1.RenderComponentPropType,
    pageScope: PropTypes.number,
    showNumbers: PropTypes.bool,
    showText: PropTypes.bool,
    showLast: PropTypes.bool,
}, core_1.SearchkitComponent.propTypes);
Pagination.defaultProps = {
    listComponent: ui_1.Toggle,
    pageScope: 3,
    showNumbers: false,
    showText: true,
    showLast: false,
    mod: "sk-pagination-navigation"
};
exports.Pagination = Pagination;
var PaginationSelect = (function (_super) {
    __extends(PaginationSelect, _super);
    function PaginationSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PaginationSelect;
}(Pagination));
PaginationSelect.defaultProps = lodash_1.defaults({
    listComponent: ui_1.Select,
    mod: 'sk-pagination-select',
    showNumbers: true,
    showText: false
}, Pagination.defaultProps);
exports.PaginationSelect = PaginationSelect;
//# sourceMappingURL=Pagination.js.map