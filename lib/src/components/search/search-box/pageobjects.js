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
var xenon_1 = require("xenon");
var SearchLoader = SearchLoader_1 = (function (_super) {
    __extends(SearchLoader, _super);
    function SearchLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SearchLoader;
}(xenon_1.Component));
SearchLoader.states = {
    HIDDEN: "is-hidden"
};
SearchLoader = SearchLoader_1 = __decorate([
    xenon_1.defaults({ qa: "loader", states: SearchLoader_1.states })
], SearchLoader);
exports.SearchLoader = SearchLoader;
var Searchbox = (function (_super) {
    __extends(Searchbox, _super);
    function Searchbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Searchbox.prototype.search = function (query) {
        this.query.type(query);
        expect(this.loader.isNotVisible()).toBe(true);
    };
    return Searchbox;
}(xenon_1.Component));
__decorate([
    xenon_1.field(xenon_1.Component, { qa: "query" }),
    __metadata("design:type", xenon_1.Component)
], Searchbox.prototype, "query", void 0);
__decorate([
    xenon_1.field(xenon_1.Component, { qa: "submit" }),
    __metadata("design:type", xenon_1.Component)
], Searchbox.prototype, "submit", void 0);
__decorate([
    xenon_1.field(SearchLoader),
    __metadata("design:type", SearchLoader)
], Searchbox.prototype, "loader", void 0);
exports.Searchbox = Searchbox;
var SearchLoader_1;
//# sourceMappingURL=pageobjects.js.map