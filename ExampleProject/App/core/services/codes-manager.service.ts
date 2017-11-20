import { Injectable } from "@angular/core";
import {Code} from "../../models/UtilityModels";
import {ApiService} from "./api.service";
import {Dictonary} from "../../helpers/Dictonary";
import { apiGetCodesForOid, apiGetCodeGroupByName } from "../../resources/api-routes";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";


@Injectable()
export class CodeManagerService {


    private codes = new Dictonary<Code[]>();
    private uncompletedObservables = new Dictonary<Observable<void>>();
    obs: Observable<void>;
    constructor(private apiService: ApiService) {
        this.getCodeGroup("naringskode").subscribe(res => this.codes.add("naringskode", res));
        this.getCodesAsync(9040).subscribe(res => this.codes.add("9040", res));
    }



    getCode(codeValue: string, oid: string): Code {
        if (this.codes.containsKey(oid)) {
            let codes = this.codes.item(oid);
            return codes.find(p => p.codeValue === codeValue);
        }
    }


    getCodeNameAsync(codeValue: string, groupName: string): Observable<string> {
        console.log(codeValue, groupName);

        if (!this.codes.containsKey(groupName)) {
            if (!this.uncompletedObservables.containsKey(groupName)) {
                this.uncompletedObservables.add(groupName, this.getCodeGroup(groupName).map((res: Code[]) => {
                    this.codes.add(groupName, res);
                }).share());
            }

            return this.uncompletedObservables.item(groupName).map((res) => {
               return this.getCodeName(codeValue, groupName);
           });
        }
        return of(this.getCodeName(codeValue, groupName));

    }

    getCodeNamesAsync(codeValues: string[], groupName: string): Observable<string> {

        if (!this.codes.containsKey(groupName)) {
            if (!this.uncompletedObservables.containsKey(groupName)) {
                this.uncompletedObservables.add(groupName, this.getCodeGroup(groupName).map((res: Code[]) => {
                    this.codes.add(name, res);
                }).share());
            }
            return this.uncompletedObservables.item(groupName).map(res => codeValues.map(val => this.getCodeName(val, groupName)).join(", "));
        }
        return of(codeValues.map(val => this.getCodeName(val, groupName)).join(", "));

    }

    getCodeName(codeValue: string, groupName: string) {
        let codeList = this.codes.item(groupName);

        let code = codeList.find(p => p.codeValue === codeValue);
        return code == undefined ? "" : code.codeText;
    }

    getCodeNameOid(codeValue: string, oid: number): string {
        return this.getCodeName(codeValue, String(oid));

    }

    getCodeNameOidAsync(codeValue: string, oid: number): Observable<string> {
        let oidstring = String(oid);
        if (!this.codes.containsKey(oidstring)) {
            if (!this.uncompletedObservables.containsKey(oidstring)) {
                this.uncompletedObservables.add(oidstring, this.getCodesAsync(oid).map((res: Code[]) => {
                    this.codes.add(oidstring, res);
                }).share());
            }
            return this.uncompletedObservables.item(oidstring).map((res) => {
                return this.getCodeName(codeValue, String(oid));
            });
        }
        return of(this.getCodeName(codeValue, String(oid)));

    }

    getCodesAsync(oid: number) {
        return this.apiService.simpleGetRequest<Code[]>(apiGetCodesForOid + oid);
    }

    getCodeGroup(name:string): Observable<Code[]> {
        return this.apiService.simpleGetRequest<Code[]>(apiGetCodeGroupByName + name);
    }

}

