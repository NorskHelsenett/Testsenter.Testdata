import { Component } from "@angular/core";
import {HodorIndexes, Environment } from "../../models/UtilityModels";
import {MediatorService} from "../../core/services/mediator.service";
import {SearchManagerService} from "../../core/services/search-manager.service";
import {SearchQuery} from "../../models/DataModels";
import {environments} from "../../resources/app-settings";

@Component({
    selector: "search-box",
    moduleId: module.id,
    templateUrl: "search-box.component.html",
    styleUrls: ["search-box.component.css"]
})
export class SearchBoxComponent {
    message: string;
    messageClass: string;
    loading: boolean;
    currentIndex = HodorIndexes.Person;
    Indexes = HodorIndexes;
    validSearchTerm: boolean = true;
    searchTerm:string = "";
    environments = environments;
    selectedEnv: Environment;

    constructor(private mediatorService: MediatorService, private searchManager: SearchManagerService) {
        this.mediatorService.searchTerm$.subscribe((keyword: SearchQuery) => {
            this.searchTerm = keyword.searchTerm;
            this.validSearchTerm = this.checkSearchTerm(keyword.searchTerm);
        });
    }

    ngOnInit(): void {
        this.setEnvironment("Test01");
        this.mediatorService.searching$.subscribe((value: boolean) => {
            this.loading = value;
        });
        this.mediatorService.clearSearchTerm$.subscribe(() => this.searchTerm = "");
        this.mediatorService.indexSwitch$.subscribe((index) => this.currentIndex = index);
    }

    search(keyword: string) {
        this.validSearchTerm = this.checkSearchTerm(keyword);
        if (this.validSearchTerm)
            this.searchManager.setSearchTerm(this.searchTerm);
            this.searchManager.performeSearch();
    }

    private checkSearchTerm(keyword: string) {
        if (!keyword)
            return true;
        keyword = keyword.trim();
        this.searchTerm = keyword;

        if (keyword.length > 300) {
            this.setMessage("Søkeordene kan makismalt samlet lengde på 300 tegn", "negative");
            return false;
        }

        this.message = "";
        return true;
    }


    cancelSearch() {
        this.searchManager.cancelSearch();
    }

    blur(keyword: string) {
        this.validSearchTerm = this.checkSearchTerm(keyword);
        if (this.validSearchTerm)
            this.searchManager.setSearchTerm(this.searchTerm);
    }

    setMessage(message: string, messageClass: string) {
        this.message = message;
        this.messageClass = messageClass;
    }

    setLoadingStatus(flag: boolean) {
        this.loading = flag;
    }

    setEnvironment(env: string) {
        this.searchManager.setEnvironment(env);
    }

    switchIndex(newIndex: HodorIndexes) {
        
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.mediatorService.switchIndex(newIndex);
            this.mediatorService.clearSearchTerm();
        }
    }
}