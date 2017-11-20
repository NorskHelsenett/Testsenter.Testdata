import { Component, OnInit } from "@angular/core";

import { of } from 'rxjs/observable/of';
import { Observable } from "rxjs/Observable";
import {PersonBaseHitTab} from "../person-base-hit-tab";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import {SurveillanceStatus} from "../../../../models/UtilityModels";
import {ApiService} from "../../../../core/services/api.service";
import {MediatorService} from "../../../../core/services/mediator.service";
import {UserManagerService} from "../../../../core/services/user-manager.service";
import {Surveillance} from "../../../../models/DataModels";
import {setStarStatus, getSurveillanceResult } from "../../../../helpers/registerhelper";
import {PregJson, HprJson } from "../../../../models/JsonModels";

@Component({
    selector: "person-notifications",
    moduleId: module.id,
    templateUrl: "person-notifications.component.html",
    styleUrls: ["person-notifications.component.css"]

})

export class PersonNotificationsComponent extends PersonBaseHitTab {
 
    loading: boolean;
    accepting:boolean;
    errorMessage:string;

    public surveillanceStatus = SurveillanceStatus;


    constructor(private apiService: ApiService,
        private mediatorService: MediatorService,
        private toastr:ToastsManager, private userManager: UserManagerService) {
        super();
    }

    toggleSurveillance(surveillance: Surveillance) {
        this.loading = true;
        if (surveillance.isChecked) {
            let hit = this.getLatestJsonContent(surveillance.registerName);
            if (hit === "") {
                console.log("Fant ikke hit for overvåkningsgjenstand");
                return;
            }

            this.apiService.postSurveillance(surveillance.urlToToggle, hit)
                .subscribe((data: any) => {
                    if (data) {
                       
                        this.surveillanceChanged(surveillance, true);
                        if (!this.item.surveillancesInfo) {
                            this.item
                                .surveillancesInfo = [
                                    { key: surveillance.actionKey, registeredBy: this.userManager.getName() }
                                ];
                        } else {
                            this.item.surveillancesInfo
                                .push({ key: surveillance.actionKey, registeredBy: this.userManager.getName() });
                        }
                        this.toastr.success("Ditt prosjekt overvåker nå " + surveillance.actionFriendlyName);
                        this.mediatorService.notifyAboutAddedSurveillance(this.item);
                    }
                    else {
                        this.undoChangesToSurveillanceAndPostError(surveillance, `Server ga beskjed om at overvåkning for ${surveillance.actionFriendlyName} ikke ble slått på`);
                    }
                },(error: string) => this.undoChangesToSurveillanceAndPostError(surveillance, error));


        } else {


            this.apiService.deleteSurveillance(surveillance.urlToToggle)
                .subscribe((data: any) => {
                    if (data) {
                        if (this.item.latestSurveillanceResults) {
                            let index = this.item.latestSurveillanceResults
                                .findIndex(result => result.actionKey === surveillance.actionKey);
                            if (index)
                                this.item.latestSurveillanceResults.splice(index, 1);
                        }
                       
                        surveillance.latestSurveillanceResultForMyTeam = undefined;
                        let secondIndex = this.item.surveillancesInfo.findIndex(sb => sb.key === surveillance.actionKey);
                        if (secondIndex)
                            this.item.surveillancesInfo.splice(secondIndex, 1);
                        this.mediatorService.notifyAboutDeletedSurveillance(this.item);
                        this.surveillanceChanged(surveillance, false);

                        this.toastr.success(`Fjernet overvåkning av ${surveillance.actionFriendlyName}`);
                    }
                    else {
                        this.undoChangesToSurveillanceAndPostError(surveillance, `Server ga beskjed om at overvåkning for ${surveillance.actionFriendlyName} ikke ble slått på`);
                    }
                }, (error: string) => this.undoChangesToSurveillanceAndPostError(surveillance, error));
        }
        return false;
    }

    private surveillanceChanged(surveillance: Surveillance, added: boolean): void {
        this.loading = false;
        let team = String(this.userManager.getProjectId());
        if (added && !this.item.teams.some(t => t === team)) {
            this.item.teams.push(team);
        }
        else if (!added) {
            if (!this.item.detail.surveillances.some(sur => sur.isChecked))
                this.item.teams.splice(this.item.teams.indexOf(team), 1);
        }
        setStarStatus(this.userManager.getProjectIdAsync(), this.item);
    }

    acceptChanges(surveillance: Surveillance, event:any): void {
        event.stopPropagation();
        let hit = this.getLatestJsonContent(surveillance.registerName);
        this.accepting = true;
        this.apiService.acceptChanges(surveillance.urlToToggle, hit).subscribe(res => {
            this.accepting = false;
            if (res) {
                if (this.item.latestSurveillanceResults) {
                    let indexes = this.item.latestSurveillanceResults
                        .filter(res => res.actionKey === surveillance.actionKey);
                    indexes.forEach(i => i.success = true);
                }

                this.item.status = SurveillanceStatus.Synced;
                if (this.item.latestSurveillanceResults
                    .some(res => getSurveillanceResult(res) === SurveillanceStatus.Unsynced))
                    this.item.status = SurveillanceStatus.Unsynced;
                surveillance.latestSurveillanceResultForMyTeam = undefined;
            }
        });
    }

    shouldShowAcceptButton(surveillance: Surveillance):Observable<boolean> {
        let result = surveillance.latestSurveillanceResultForMyTeam;
        if (result && !result.success) {
            return this.userManager.getNameAsync().map((name: string) => { return result.registeredBy === name });
        }
        return of(false);
    }

    private undoChangesToSurveillanceAndPostError(surveillance: Surveillance, error: string): void {
        this.loading = false;
        surveillance.isChecked = !surveillance.isChecked;
        this.handleError(error);
    }

    private handleError(errorMessage: string): void {
        console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.toastr.error(errorMessage);
        setTimeout(() => {
            this.errorMessage = "";
        }, 3000);
    }


    getJsonDetailObject(surveillance: Surveillance, currentValue = true): any {
        
        let json = currentValue ? this.getLatestJsonContent(surveillance.registerName) : surveillance.originalContentAsJson;
        if (json === "") return {};
        let jsonObject = this.convertToObject(json, surveillance.registerName);
        if (jsonObject == null) return {};
        switch (surveillance.actionKey.toLowerCase()) {
            case "pregadressing":
                return { "Addresses": jsonObject.Addresses };
            case "pregfullname":
                return { "GivenName": jsonObject.GivenName, "MiddleName": jsonObject.MiddleName, "Sn": jsonObject.Sn };
            case "hprgodkjenninger":
                return { "Godkjenninger": jsonObject.Godkjenninger };
            default:
                return {};
        }
    }


    convertToObject(jsonstring: string, registerName: string): any {
        switch (registerName.toLowerCase()) {
            case "preg":
                return JSON.parse(jsonstring) as PregJson;
            case "hpr":
                return JSON.parse(jsonstring) as HprJson;
            default:
                return null;
        }
    }

}