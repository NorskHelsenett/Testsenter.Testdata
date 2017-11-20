import { Component, OnInit } from "@angular/core";
import {ChildViews} from "../../models/UtilityModels";
import {RegisterPerson} from "../../models/DataModels";
import {ApiService} from "../../core/services/api.service";
import {UserManagerService} from "../../core/services/user-manager.service";
import {DataManagerService} from "../../core/services/data-manager.service";


@Component({
    selector: "surveillance-overview",
    moduleId: module.id,
    templateUrl: "surveillance-overview.component.html",
    styleUrls: ["surveillance-overview.component.css"]
})
export class SurveillanceOverviewComponent implements OnInit {

    message: string;
    messageClass: string;
    loading: string;

    nextCheck: Date;
    latestCheck: Date;
    public childViews = ChildViews;

    persons:RegisterPerson[];
    personalSurveillances: RegisterPerson[] = [];
    projectSurveillances: RegisterPerson[] = [];

    team: string[];
    filter: string[] = [];
    isEmpty = true;

    constructor(private apiService: ApiService, private userManagerService: UserManagerService, private dataManagerService:DataManagerService){}

    ngOnInit() {
        this.dataManagerService.surveillanceResults$.subscribe(result => {
            if (result == undefined || result.length === 0) return;
            this.personalSurveillances = [];
            this.projectSurveillances = [];
            //sort to get unsynced on top
            this.persons = result.filter(r => r.latestSurveillanceResults != undefined &&
                    r.latestSurveillanceResults.some(s => !s.success))
                .concat(result.filter(r => r.latestSurveillanceResults == undefined ||
                    !r.latestSurveillanceResults.some(s => !s.success)));


            this.persons.forEach(p => {
                if (p.surveillancesInfo.some(sb => sb.registeredBy === this.userManagerService.getName())) {
                    this.personalSurveillances.push(p);
                } else {
                    this.projectSurveillances.push(p);
                }
            });
            this.team = this.getTeamList(this.projectSurveillances);
            this.filter = this.team.slice();

        }); 
    }


    private getTeamList(list:RegisterPerson[]) {
        let t:string[] = [];
        for (let person of list) {
            if (person.latestSurveillanceResults) {
                person.latestSurveillanceResults.forEach(p => {
                    t.push(p.registeredBy);
                });
            }
        }
        let seen = {}
        return t.filter(x => {
            if (seen[x])
                return;
            seen[x] = true;
            return x;
        });
    }


    onCheckBoxSelect(person: string, t:any) {
        if (t.checked) {
            this.filter.push(person);
        } else
            this.filter.splice(this.filter.indexOf(person), 1);
        this.projectSurveillances = this.filterList(this.filter);
    }

    filterList(team:string[]) {
        return this.persons.filter(f => f.surveillancesInfo.some(res => team.indexOf(res.registeredBy) !== -1 && !f.surveillancesInfo.some(res => res.registeredBy === this.userManagerService.getName())));
    }

}