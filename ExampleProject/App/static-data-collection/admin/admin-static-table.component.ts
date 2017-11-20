import { Component, Input } from '@angular/core';
import { OrderByPipe } from "ngx-pipes/src/app/pipes/array/order-by";
import {ApiService} from "../../core/services/api.service";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'admin-static-table',
    templateUrl: 'admin-static-table.component.html',
    providers: [OrderByPipe]
})
export class AdminStaticTableComponent {
    @Input()
    rows: any[];
    @Input()
    isPerson: boolean;

    sortProp: string;
   
    sortdir: boolean;
    loading: boolean;
    saving: boolean;
    activeComment: number;
    lastSelectedIndex: number;

    approveList: any[] = [];

    constructor(private apiService: ApiService, private orderBy: OrderByPipe) { }

    get typeUrl(): string { return this.isPerson ? "person" : "business"; }

    sort(prop: string) {
        this.lastSelectedIndex = -1;
        this.sortdir = !this.sortdir;
        this.sortProp = prop;
        if (this.sortProp === "hodorcomment" || this.sortProp === "personcomment") {
            this.rows = this.rows.sort((a, b) => {
                let p1: string;
                let p2: string;
                if (this.sortProp === "hodorcomment") {
                    p1 = a.hodorcomment;
                    p2 = b.hodorcomment;
                } else if (this.sortProp === "registers") {
                    p1 = a.registers;
                    p2 = b.registers;
                } else {
                    p1 = a.personcomment;
                    p2 = b.personcomment;
                }
                if (p1 == undefined && p2 == undefined)
                    return 0;
                if (p1 == undefined)
                    return 1;
                if (p2 == undefined)
                    return -1;
                return p1.toLowerCase().localeCompare(p2.toLowerCase());
            });
            if (this.sortdir)
                this.rows.reverse();
        }
        if (this.sortProp === "date") {
            this.rows.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            if (this.sortdir)
                this.rows.reverse();
        }
        else
            this.rows = this.orderBy.transform(this.rows, ((this.sortdir ? '' : '-') + this.sortProp));

    }

    isSelected(key: string, id: string): boolean {
        return this.approveList.findIndex(p => p.key === key && p.id === id) > -1;
    }

    addToList(key: string, id: string, event: any, index: number) {
        if (event.ctrlKey && this.lastSelectedIndex > -1 && this.lastSelectedIndex !== index) {
            let start = this.lastSelectedIndex < index ? this.lastSelectedIndex : index;
            let stop = this.lastSelectedIndex > index ? this.lastSelectedIndex : index;
            this.rows.slice(start, stop + 1).forEach(row => {
                if (!this.isSelected(row.key, row.id))
                    this.approveList.push({ "key": row.key, "id": row.id });
            });
        } else {
            this.isSelected(key, id)
                ? this.approveList.splice(this.approveList.findIndex(p => p.key === key && p.id === id), 1)
                : this.approveList.push({ "key": key, "id": id });
        }

        this.lastSelectedIndex = index;
    }

    approve() {
        this.loading = true;
        this.apiService.simplePostRequest<boolean>("api/StaticData/Approve/"+this.typeUrl, this.approveList).subscribe(res => {
            this.loading = false;
            if (!res)
                return;
            this.approveList.forEach(a => this.rows.find(p => p.key === a.key && p.id === a.id).approved = !this.rows.find(p => p.key === a.key && p.id === a.id).approved);
            this.approveList = [];

        });
    }


    saveComment(person: any) {
        this.saving = true;
        this.apiService.simplePostRequest<boolean>("api/StaticData/Comment/"+this.typeUrl, { "partition": person.business, "key": person.key, "id": person.id, "comment": person.hodorcomment }).subscribe(res => {
            this.saving = false;
            if (!res)
                return;
            this.activeComment = -1;
        });
    }

}