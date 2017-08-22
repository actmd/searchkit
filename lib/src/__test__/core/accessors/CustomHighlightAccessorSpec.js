"use strict";
var _this = this;
var _1 = require("../../../");
describe("CustomHighlightAccessor", function () {
    beforeEach(function () {
        _this.accessor = new _1.CustomHighlightAccessor({});
    });
    it("constructor(), computeHighlightedFields()", function () {
        expect(_this.accessor.highlightRequest).toEqual({});
    });
    it("buildOwnQuery()", function () {
        var query = _this.accessor.buildOwnQuery(new _1.ImmutableQuery());
        expect(query.query.highlight).toEqual({});
    });
});
//# sourceMappingURL=CustomHighlightAccessorSpec.js.map