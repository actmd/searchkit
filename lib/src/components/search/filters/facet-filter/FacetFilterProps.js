"use strict";
var PropTypes = require("prop-types");
var core_1 = require("../../../../core");
var lodash_1 = require("lodash");
exports.FacetFilterPropTypes = lodash_1.defaults({
    field: PropTypes.string.isRequired,
    operator: PropTypes.oneOf(["AND", "OR"]),
    size: PropTypes.number,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    containerComponent: core_1.RenderComponentPropType,
    listComponent: core_1.RenderComponentPropType,
    itemComponent: core_1.RenderComponentPropType,
    translations: core_1.SearchkitComponent.translationsPropType(core_1.FacetAccessor.translations),
    orderKey: PropTypes.string,
    orderDirection: PropTypes.oneOf(["asc", "desc"]),
    include: PropTypes.oneOfType([
        PropTypes.string, PropTypes.array
    ]),
    exclude: PropTypes.oneOfType([
        PropTypes.string, PropTypes.array
    ]),
    showCount: PropTypes.bool,
    showMore: PropTypes.bool,
    fieldOptions: PropTypes.shape({
        type: PropTypes.oneOf(["embedded", "nested", "children"]).isRequired,
        options: PropTypes.object
    }),
    countFormatter: PropTypes.func,
    bucketsTransform: PropTypes.func
}, core_1.SearchkitComponent.propTypes);
//# sourceMappingURL=FacetFilterProps.js.map