"use strict";
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var allowedOptions = ["score_mode", "inner_hits"];
function HasParentQuery(parent_type, query, options) {
    if (options === void 0) { options = {}; }
    return {
        has_parent: lodash_1.assign({
            parent_type: parent_type, query: query
        }, lodash_2.pick(options, allowedOptions))
    };
}
exports.HasParentQuery = HasParentQuery;
//# sourceMappingURL=HasParentQuery.js.map