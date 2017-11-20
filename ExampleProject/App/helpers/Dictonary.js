"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictonary = (function () {
    function Dictonary() {
        this.items = {};
        this.itemCount = 0;
    }
    Dictonary.prototype.containsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    Dictonary.prototype.count = function () {
        return this.itemCount;
    };
    Dictonary.prototype.add = function (key, value) {
        if (!this.items.hasOwnProperty(key))
            this.itemCount++;
        this.items[key] = value;
    };
    Dictonary.prototype.remove = function (key) {
        var val = this.items[key];
        delete this.items[key];
        this.itemCount--;
        return val;
    };
    Dictonary.prototype.item = function (key) {
        return this.items[key];
    };
    Dictonary.prototype.keys = function () {
        var keySet = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
        return keySet;
    };
    Dictonary.prototype.values = function () {
        var values = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
        return values;
    };
    return Dictonary;
}());
exports.Dictonary = Dictonary;
//# sourceMappingURL=Dictonary.js.map