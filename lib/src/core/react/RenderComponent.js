"use strict";
var React = require("react");
var PropTypes = require("prop-types");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
exports.RenderComponentPropType = PropTypes.oneOfType([
    function (props, propName, componentName) {
        if (lodash_2.isUndefined(props[propName]) || (props[propName]["prototype"] instanceof React.Component)) {
            return null;
        }
    },
    PropTypes.element,
    PropTypes.func,
]);
function renderComponent(component, props, children) {
    if (props === void 0) { props = {}; }
    if (children === void 0) { children = null; }
    var isReactComponent = (component["prototype"] instanceof React.Component ||
        (component["prototype"] && component["prototype"].isReactComponent) ||
        typeof component === 'function');
    if (isReactComponent) {
        return React.createElement(component, props, children);
    }
    else if (React.isValidElement(component)) {
        return React.cloneElement(component, lodash_1.omitBy(props, lodash_2.isUndefined), children);
    }
    console.warn("Invalid component", component);
    return null;
}
exports.renderComponent = renderComponent;
//# sourceMappingURL=RenderComponent.js.map