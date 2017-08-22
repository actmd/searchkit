"use strict";
var lodash_1 = require("lodash");
function MatchQuery(field, query, options) {
    if (options === void 0) { options = {}; }
    if (!query || !field) {
        return;
    }
    return {
        match: (_a = {},
            _a[field] = lodash_1.assign({ query: query }, options),
            _a)
    };
    var _a;
}
exports.MatchQuery = MatchQuery;
//# sourceMappingURL=MatchQuery.js.map