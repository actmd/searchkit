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
var State_1 = require("./State");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var lodash_5 = require("lodash");
var update = require("react-addons-update");
var LevelState = (function (_super) {
    __extends(LevelState, _super);
    function LevelState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelState.prototype.getValue = function () {
        return this.value || [];
    };
    LevelState.prototype.add = function (level, val) {
        var ob = this.getValue();
        if (!lodash_1.isArray(ob[level])) {
            ob = update(ob, (_a = {},
                _a[level] = { $set: [] },
                _a));
        }
        ob = update(ob, (_b = {},
            _b[level] = { $push: [val] },
            _b));
        return this.create(ob);
        var _a, _b;
    };
    LevelState.prototype.contains = function (level, val) {
        return lodash_5.indexOf(this.getValue()[level], val) !== -1;
    };
    LevelState.prototype.clear = function (level) {
        if (level === void 0) { level = 0; }
        return this.create(lodash_2.take(this.getValue(), level));
    };
    LevelState.prototype.remove = function (level, val) {
        return this.create(update(this.getValue(), (_a = {},
            _a[level] = { $set: lodash_4.without(this.getValue()[level], val) },
            _a)));
        var _a;
    };
    LevelState.prototype.toggle = function (level, val) {
        if (this.contains(level, val)) {
            return this.remove(level, val);
        }
        else {
            return this.add(level, val);
        }
    };
    LevelState.prototype.getLevel = function (level) {
        return this.getValue()[level] || [];
    };
    LevelState.prototype.levelHasFilters = function (level) {
        return this.getLevel(level).length > 0;
    };
    LevelState.prototype.getLeafLevel = function () {
        return lodash_3.size(this.value) - 1;
    };
    LevelState.prototype.isLeafLevel = function (level) {
        return level === this.getLeafLevel();
    };
    LevelState.prototype.toggleLevel = function (level, key) {
        if (this.contains(level, key)) {
            if (this.isLeafLevel(level)) {
                return this.clear(level);
            }
            else {
                return this.clear(level + 1);
            }
        }
        else {
            return this.clear(level)
                .add(level, key);
        }
    };
    return LevelState;
}(State_1.State));
exports.LevelState = LevelState;
//# sourceMappingURL=LevelState.js.map