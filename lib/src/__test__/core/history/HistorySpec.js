"use strict";
var history_1 = require("../../../core/history");
describe("History", function () {
    it("encode / decode searchkit obj", function () {
        var obj = { q: "test", categories: [["movie"], ["Crime"]], actors: ["a", 'b-c', 'd & e', 'f=g'], writers: ['d'] };
        var str = history_1.encodeObjUrl(obj);
        expect(str).toEqual('q=test&categories[0][0]=movie&categories[1][0]=Crime&actors[0]=a&actors[1]=b-c&actors[2]=d%20%26%20e&actors[3]=f%3Dg&writers[0]=d');
        expect(history_1.decodeObjString(str)).toEqual(obj);
    });
});
//# sourceMappingURL=HistorySpec.js.map