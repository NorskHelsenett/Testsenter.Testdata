"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Family = (function () {
    function Family(json) {
        this.father = json.father;
        this.mother = json.mother;
        this.person = json.person;
        this.children = json.children;
        if (this.father && this.mother)
            this.numberOfParents = 2;
        else if (this.father || this.mother) {
            this.numberOfParents = 1;
        }
        else {
            this.numberOfParents = 0;
        }
    }
    return Family;
}());
exports.Family = Family;
var FamilyMember = (function () {
    function FamilyMember() {
    }
    return FamilyMember;
}());
exports.FamilyMember = FamilyMember;
//# sourceMappingURL=familymodels.js.map