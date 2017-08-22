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
var pageobjects_1 = require("../../../src/components/pageobjects");
var protractor_1 = require("protractor");
var Hit = (function (_super) {
    __extends(Hit, _super);
    function Hit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Hit;
}(xenon_1.Component));
__decorate([
    xenon_1.field(xenon_1.Component, { qa: "title" }),
    __metadata("design:type", xenon_1.Component)
], Hit.prototype, "title", void 0);
var MovieHits = (function (_super) {
    __extends(MovieHits, _super);
    function MovieHits() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MovieHits;
}(xenon_1.List));
MovieHits = __decorate([
    xenon_1.defaults({ qa: "hits", itemQA: "hit", itemType: Hit })
], MovieHits);
var SearchPage = (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SearchPage;
}(xenon_1.Component));
__decorate([
    xenon_1.field(MovieHits),
    __metadata("design:type", MovieHits)
], SearchPage.prototype, "hits", void 0);
__decorate([
    xenon_1.field(pageobjects_1.Searchbox),
    __metadata("design:type", pageobjects_1.Searchbox)
], SearchPage.prototype, "searchbox", void 0);
__decorate([
    xenon_1.field(pageobjects_1.HitsStats),
    __metadata("design:type", pageobjects_1.HitsStats)
], SearchPage.prototype, "hitStats", void 0);
__decorate([
    xenon_1.field(pageobjects_1.FacetFilter, { id: "actors" }),
    __metadata("design:type", pageobjects_1.FacetFilter)
], SearchPage.prototype, "actorsFilter", void 0);
var searchPage = null;
describe("example", function () {
    beforeEach(function () {
        searchPage = new SearchPage();
        protractor_1.browser.get("http://localhost:4000/movie-app");
    });
    it("should show hits", function () {
        expect(searchPage.hits.isVisible(20000)).toBe(true);
        expect(searchPage.hits.count()).toBe(12);
    });
    it("should find matrix", function () {
        searchPage.searchbox.search("matrix");
        expect(searchPage.hits.get(0).isVisible()).toBe(true);
        expect(searchPage.hits.get(0).title.getText()).toBe("The Matrix");
        expect(searchPage.hits.count()).toBe(3);
        expect(searchPage.hitStats.info.getText()).toBe("3 results found");
    });
    it("should refine actors", function () {
        expect(searchPage.actorsFilter.isVisible()).toBe(true);
        var firstOption = searchPage.actorsFilter.options.get(0);
        expect(searchPage.actorsFilter.options.count()).toBe(10);
        expect(firstOption.label.getText()).toBe("Naveen Andrews");
        protractor_1.browser.executeScript("window.scrollTo(0,0)");
        firstOption.click();
        expect(searchPage.searchbox.loader.isNotVisible()).toBe(true);
        var firstHit = searchPage.hits.get(0);
        expect(firstHit.isVisible()).toBe(true);
        expect(firstHit.title.getText()).toBe("Lost");
        var secondOption = searchPage.actorsFilter.options.get(1);
        expect(secondOption.label.getText()).toBe("Emilie de Ravin");
        secondOption.click();
        expect(searchPage.searchbox.loader.isNotVisible()).toBe(true);
        firstHit = searchPage.hits.get(0);
        expect(firstHit.isVisible()).toBe(true);
        expect(firstHit.title.getText()).toBe("Do No Harm");
        searchPage.actorsFilter.options.get(0).click();
        expect(searchPage.searchbox.loader.isNotVisible()).toBe(true);
        firstHit = searchPage.hits.get(0);
        expect(firstHit.title.getText()).toBe("Lost");
        expect(searchPage.hitStats.info.getText()).toBe("73 results found");
    });
});
//# sourceMappingURL=MovieSpec.js.map