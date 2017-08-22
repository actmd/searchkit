"use strict";
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var allowedOptions = ["score_mode", "inner_hits", "min_children", "max_children"];
function HasChildQuery(type, query, options) {
    if (options === void 0) { options = {}; }
    return {
        has_child: lodash_1.assign({
            type: type, query: query
        }, lodash_2.pick(options, allowedOptions))
    };
}
exports.HasChildQuery = HasChildQuery;
//# sourceMappingURL=HasChildQuery.js.map