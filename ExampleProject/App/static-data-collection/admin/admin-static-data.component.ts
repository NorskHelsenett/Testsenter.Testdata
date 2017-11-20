import { Component } from '@angular/core';
import { StaticDataRegistration } from "../../models/UtilityModels";
import { OrderByPipe } from "ngx-pipes/src/app/pipes/array/order-by";
import { ApiService } from "../../core/services/api.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'admin-static-data',
    templateUrl: 'admin-static-data.component.html',
    providers: [OrderByPipe]
})
export class AdminStaticDataComponent {

    registrations: StaticDataRegistration[];
    sortProp:string;
    prows: any[] = [];
    brows: any[] = [];
    sortdir: boolean;
    loading: boolean;
    saving: boolean;
    activeComment: number;
    lastSelectedIndex:number;
    plink:SafeUrl;
    blink:SafeUrl;
    approveList:any[] = [];
    blob: any;

    constructor(private apiService: ApiService, private orderBy: OrderByPipe, private sanitizer: DomSanitizer ) { }

    ngOnInit() {
        this.apiService.simpleGetRequest<StaticDataRegistration[]>("api/StaticData/All").subscribe(res => {
            this.registrations = res;
            this.generateRowData();
            this.makeLink();
        });
    }

    makeLink() {
        this.plink = this.sanitize("data:text/csv;charset=utf-8," +
            encodeURIComponent(this.convert(this.prows.map(
                s => this.cleanvalues(s)))));
        this.blink = this.sanitize("data:text/csv;charset=utf-8," + encodeURIComponent(this.convert(this.brows.map(
            s => this.cleanvalues(s)))));
    }


    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    cleanvalues(s: any) {
        let comment: string;
        let personcomment: string;
        let hodorcomment: string;
        let registers: string;
        if (s.comment != undefined)
            comment = s.comment.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        if (s.personcomment != undefined)
            personcomment = s.personcomment.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        if (s.hodorcomment != undefined)
            hodorcomment = s.hodorcomment.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        if (s.registers != undefined)
            registers = s.registers.replace(/,/g, " ").replace(/(\r\n|\n|\r)/g, " ");
        return {
            "index": s.index,
            "business": s.business,
            "name": s.name,
            "email": s.email,
            "comment": comment,
            "date": s.date,
            "id": s.id,
            "buypass": s.buypass,
            "commfides": s.commfides,
            "personcomment": personcomment,
            "approved": s.approved,
            "hodorcomment": hodorcomment,
            "registers": registers
        };
    }

    private convert(data: any[]): string {
        console.log(data);
        let tabText = '';
        const keys = Object.keys(data[0]);
        
        let headers = keys;

        headers.forEach(h => {
            tabText += '"' + h + '",';
        });

        if (tabText.length > 0) {
            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        }

        data.forEach(d => {
            keys.forEach(k => {
                if (d.hasOwnProperty(k) && d[k] != null) {
                    tabText += '"' + d[k] + '",';
                } else {
                    tabText += '"",';
                }
            });

            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        });

        return tabText;
    }



    generateRowData() {
        if (this.registrations === null)
            return;
        this.prows = []; let i = 0;
        this.registrations.forEach(reg => {
            i++;
            if (reg.staticPersons)
                reg.staticPersons.forEach(person => {
                    this.prows.push({
                        "index": i,
                        "business": reg.contactInformation.business,
                        "name": reg.contactInformation.firstName +
                            " " +
                            reg.contactInformation.lastName,
                        "email": reg.contactInformation.email,
                        "comment": reg.contactInformation.comments,
                        "date": reg.date,
                        "id": person.id,
                        "buypass": person.buypass,
                        "commfides": person.commfides,
                        "personcomment": person.comment,
                        "approved": person.approved,
                        "key": reg.key,
                        "hodorcomment": person.hodorComment,
                        "registers": person.registers
                    });
               
            });
            if (reg.staticBusinesses)
                reg.staticBusinesses.forEach(person => {
                this.brows.push({
                    "index": i,
                    "business": reg.contactInformation.business,
                    "name": reg.contactInformation.firstName +
                        " " +
                        reg.contactInformation.lastName,
                    "email": reg.contactInformation.email,
                    "comment": reg.contactInformation.comments,
                    "date": reg.date,
                    "id": person.id,
                    "personcomment": person.comment,
                    "approved": person.approved,
                    "key": reg.key,
                    "hodorcomment": person.hodorComment,
                    "registers": person.registers
                });

            });
        });
    }
    



}