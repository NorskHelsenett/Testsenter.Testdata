import { Component } from "@angular/core";
import { FileUploader } from 'ng2-file-upload'
import {ApiService} from "../core/services/api.service";
declare var $: any;

@Component({
    moduleId: module.id,
    selector: "statistics-index",
    templateUrl: "statistics-index.component.html",
    styleUrls: ["statistics.css"]
})

export class StatisticsIndexComponent{
    stats: any;
    blobs: any[];
    selectedBlob: any = null;
    selectedFile: any;
    loading: boolean;
    public uploader: FileUploader = new FileUploader({ url: "api/Statistics/Upload" });

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.simpleGetRequest<any[]>("api/Statistics/All").subscribe((res: any) => {
            this.blobs = res;
        });   
       
    }

    getFile() {
        console.log("Blob", this.selectedBlob);
        if (this.selectedBlob == null || this.selectedBlob == undefined)
            return;
        this.loading = true;
        this.apiService.simpleGetRequest<any>("api/Statistics/Get/".concat(this.selectedBlob)).subscribe((res: any) => {
            console.log(res);
            this.stats = JSON.parse(res);
            this.loading = false;

        });
    }

    setFile(event: any) {
        this.loading = true;
        this.uploader.uploadAll();
        this.loading = false;
    }
    ngAfterViewInit() {
        $('.menu .item').tab();
    }


}