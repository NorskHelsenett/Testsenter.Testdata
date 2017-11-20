export class Family {
    constructor(json: any) {
        this.father = json.father;
        this.mother = json.mother;
        this.person = json.person;
        this.children = json.children;

        if (this.father && this.mother)
            this.numberOfParents = 2;
        else if (this.father || this.mother) {
            this.numberOfParents = 1;
        } else {
            this.numberOfParents = 0;
        }
    }

    mother: FamilyMember;
    father: FamilyMember;
    person: FamilyMember;
    children: FamilyMember[];
    numberOfParents: number;
}

export class FamilyMember {
    name: string;
    age: number;
    birthDate: Date;
    nin: string;
    deathDate: Date;
    dateAndAgeString: string;
    custody: string;
}