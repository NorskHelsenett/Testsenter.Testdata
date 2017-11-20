import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { of } from "rxjs/observable/of";

import "rxjs/add/operator/toPromise";


import { Subscription } from "rxjs/subscription";

import { ApiService } from "./api.service";
import { MediatorService } from "./mediator.service";
import { UserManagerService } from "./user-manager.service";
import {RegisterPerson, RegisterBusiness, SearchResult, Tag, PersonDetails, BusinessDetails, UserData,
    SurveillanceResult, Search, Comment } from "../../models/DataModels";
import {SurveillanceInformation, HodorIndexes, ErrorMessage, SurveillanceItemInformation, SurveillanceStatus } from "../../models/UtilityModels";
import {getSurveillanceResult} from "../../helpers/registerhelper";


/**
 * Håndterer all data relatert til søkeresultarer, varslinger og tags. 
 */
@Injectable()
export class DataManagerService {

    private searchResultsSubject: Subject<SearchResult<RegisterPerson | RegisterBusiness>> = new ReplaySubject<SearchResult<RegisterPerson | RegisterBusiness>>(1);
    private surveillanceResultsSubject: Subject<RegisterPerson[]> = new ReplaySubject<RegisterPerson[]>(1);
    private deletedTagSubject: Subject<Tag> = new Subject<Tag>();
    private surveillanceStatusSubject = new ReplaySubject<SurveillanceInformation>(1);
    private tagsSubject = new ReplaySubject<Tag[]>(1);
    private index = HodorIndexes.Person;

    searchResults$ = this.searchResultsSubject.asObservable();
    surveillanceResults$ = this.surveillanceResultsSubject.asObservable();
    surveillanceStatus$ = this.surveillanceStatusSubject.asObservable();
    tags$ = this.tagsSubject.asObservable();
    deletedTag$ = this.deletedTagSubject.asObservable();

    private surveillanceResults: RegisterPerson[];
    private searchResults: SearchResult<RegisterPerson | RegisterBusiness>;
    private tags: Tag[];

    private personDetailList:PersonDetails[];
    private businessDetailList: BusinessDetails[];

    private syncTimes: Array<[string, Date]>;

    private searchSubscription: Subscription;

    constructor(private apiService: ApiService, private mediatorService: MediatorService, private userManagerService: UserManagerService ) {
        this.mediatorService.surveillancerRemoved$.subscribe((data: RegisterPerson ) => this.updateSurveillance(data, false));
        this.mediatorService.surveillanceAdded$.subscribe((data: RegisterPerson) => this.updateSurveillance(data, true));
        this.mediatorService.userInfo$.subscribe((user: UserData) => this.getSurveillances(user));
        this.mediatorService.indexSwitch$.subscribe((index: HodorIndexes) => this.switchIndex(index));
        this.personDetailList = [];
        this.businessDetailList = [];
    }

    switchIndex(switchTo: HodorIndexes) {
        this.index = switchTo;
        this.searchResults = new SearchResult<RegisterPerson | RegisterBusiness>();
        this.searchResultsSubject.next(this.searchResults);
    }

    /**
     * Henter inn varslingene til en brukers prosjekt. Først hentes personer som prosjektet har satt opp varslinger på ned fra søkeindeksen.
     * Etter dette blir informasjon om varslingene hentet fra serveren.
     * @param user Brukeren man ønsker å hente varslinger til
     */
    getSurveillances(user: UserData) {
        if (user.projectValue === -1) return;
        this.mediatorService.isSearching(true);
        this.apiService.getIndexedProjectSurveillances(user.projectValue).subscribe((res: RegisterPerson[]) => {
            if (!res) {
                this.mediatorService.isSearching(false);
                 return;
            }
            this.surveillanceResults = res;
            this.apiService.getSurveillanceForProject().subscribe((data: SurveillanceResult[]) => {
                this.processSurveillances(data);

                this.surveillanceResultsSubject.next(this.surveillanceResults);
                this.mediatorService.isSearching(false);
            }, (error: any) => {
                this.mediatorService.isSearching(false);
                this.mediatorService.setErrorMessage(new ErrorMessage("En feil oppsto når dine varslinger skulle hentes, vennligst prøv igjen"));
            });
        }, (error: any) => {
            this.mediatorService.isSearching(false);
            this.mediatorService.setErrorMessage(new ErrorMessage("En feil oppsto når dine varslinger skulle hentes, vennligst prøv igjen"));
        });

       
       
        this.apiService.getTags().subscribe((tags: Tag[]) => {
            this.tags = tags;
            this.tagsSubject.next(this.tags);
        });
    }

    /**
     * Legger til en tag til en person
     * @param tag Navnet på taggen
     * @param id Id'en til personen, enten nin eller hrp nummer. Id'en til en person er gitt av commonIdentifier feltet i personens {@link RegisterPerson} objekt
     * @param person Person objektet som taggen skal legges til
     */
    addTag(tag: string, id: string, person: RegisterPerson | RegisterBusiness, index: HodorIndexes) : void {
        let tagInfo = this.tags.find(x => x.name === tag);
        
        if (tagInfo && person.tags.find(t => t === tagInfo.key))
            return;
        this.apiService.addTag(id, tag, index).subscribe(res => {
            if (this.tags.find(t => t.name === res.name) === undefined) {
                this.tags.push(res);
                this.tagsSubject.next(this.tags);
            }
            person.tags.push(res.key);
        });
    }

     /**
     * Fjerner en tag fra en person
     * @param tag Navnet på taggen
     * @param id Id'en til personen, enten nin eller hrp nummer. Id'en til en person er gitt av commonIdentifier feltet i personens {@link RegisterPerson} objekt
     * @param person Person objektet som taggen skal fjernes fra
     */
    removeTag(tag: string, id: string, item: RegisterPerson | RegisterBusiness, index: HodorIndexes): void {
        let t = this.tags.find(x => x.name === tag);
        if (t)
            item.tags.splice(item.tags.indexOf(t.key), 1);
        this.apiService.removeTag(id, tag, index).subscribe();
    }

    /**
     * Sletter en tag. Alle persones som var tagget med denne taggen vil da miste den. Man kan kun slette tager man selv har opprettet.
     * Lagerede søk som kun inneholder taggen vil også bli slettet.
     * @param tag Taggen som skal bli slettet
     */
    deleteTag(tag: Tag): void {
        this.apiService.deleteTag(tag.name).subscribe(res => {
            
                if (this.searchResults) {
                    this.searchResults.documents.filter(p => p.tags.some(t => t === tag.key))
                        .forEach(p => p.tags.splice(p.tags.indexOf(tag.key), 1));
                    this.searchResultsSubject.next(this.searchResults);
                }
                    
                if (this.surveillanceResults) {
                    this.surveillanceResults.filter(p => p.tags.some(t => t === tag.key))
                        .forEach(p => p.tags.splice(p.tags.indexOf(tag.key), 1)); 
                    this.surveillanceResultsSubject.next(this.surveillanceResults);
                }
                    
                if (this.tags) {
                    this.tags.splice(this.tags.indexOf(tag), 1);
                    this.tagsSubject.next(this.tags);
                }

                this.deletedTagSubject.next(tag);
                if (!res) {
                    this.mediatorService.updateSavedSearches();
                }
        });
    }

    /**
     * Tar inn en liste med overvåkningsresultater og matcher dem opp med en eksisterende med personer. 
     * @param data
     */
    private processSurveillances(data:SurveillanceResult[]) {

        data.forEach(result => {
            let match = this.surveillanceResults.find(p => p.commonIdentifier === result.commonIdentifier);
            if (match) {
                if (match.latestSurveillanceResults == undefined)
                    match.latestSurveillanceResults = [];
                match.latestSurveillanceResults.push(result);
                if (match.surveillancesInfo == undefined)
                    match.surveillancesInfo = [];
                match.surveillancesInfo.push(<SurveillanceItemInformation>{key:result.actionKey,registeredBy:result.registeredBy });
            } 
        });
        this.surveillanceResults = this.surveillanceResults.filter(r => r.latestSurveillanceResults != undefined);
        this.setSurveillanceState(this.surveillanceResults);
        this.pushSurveillanceStatus();

    }

    //Burde flyttes til search-mananger
    getSearchResult(query: Search) {
        this.mediatorService.isSearching(true);
        if (this.index === HodorIndexes.Business) {
            this.searchSubscription = this.apiService.buisnessSearch(query).subscribe((data:
                SearchResult<RegisterBusiness>) => {
                    this.searchResults = data;
                    this.searchResultsSubject.next(this.searchResults);
                    this.mediatorService.isSearching(false);

            }, (error: any) => {
                this.searchResultsSubject.next(undefined);
                this.mediatorService.isSearching(false);
                console.log("Something went wrong " + error);
            });
        } else {
            this.searchSubscription = this.apiService.personSearch(query)
                .subscribe((data: SearchResult<RegisterPerson>) => {
                    this.processSearchResult(data.documents);

                    this.searchResults = data;
                    this.searchResultsSubject.next(this.searchResults);
                    this.mediatorService.isSearching(false);
                }, (error: any) => {
                    this.searchResultsSubject.next(undefined);
                    this.mediatorService.isSearching(false);
                    console.log("Something went wrong " + error);
                });
        }
      
    }

    processSearchResult(result: RegisterPerson[]) {
        if (this.surveillanceResults === undefined ||
            this.surveillanceResults.length === 0) return;
        if (result == undefined)
            return;
        for (let person of result) {
            let match = this.surveillanceResults.find(s => s.commonIdentifier === person.commonIdentifier);
            if (match !== undefined) {
                result.splice(result.indexOf(person), 1);
                result.unshift(match);
            }
        }
    }

    private setSurveillanceState(projectSurveillances: RegisterPerson[]) {
        projectSurveillances.forEach(person => {
            person.status = SurveillanceStatus.Synced;
            if (person.latestSurveillanceResults == undefined)
                return;
           if (person.latestSurveillanceResults
                .some(res => getSurveillanceResult(res) === SurveillanceStatus.Unsynced))
                person.status = SurveillanceStatus.Unsynced;
        });
    }


    addCommentToPerson(content: string, ci: string) {
        let comment = <Comment>{
            commonIdentifier: ci,
            content: content
        }
        return this.apiService.addComment(comment).map((res: Comment) => {
            if (res) {
                console.log(isNaN(+ci));
                let item: PersonDetails | BusinessDetails;
                if (isNaN(+ci)) {
                    item = this.businessDetailList.find(p => p.commonIdentifier === comment.commonIdentifier);
                } else {
                    item = this.personDetailList.find(p => p.commonIdentifier === comment.commonIdentifier);
                }

                if (!item.comments)
                    item.comments = [res];
                else
                    item.comments.unshift(res);
                return true;
            }
            return false;
        });

    }

    removeComment(comment: Comment) {
        this.apiService.removeComment(comment).subscribe((res: boolean) => {
            if (res) {
                let person = this.personDetailList.find(p => p.commonIdentifier === comment.commonIdentifier);
                if(person)
                    person.comments.splice(person.comments.findIndex(c => c.key === comment.key), 1);
            }
        });
    }

    cancelSearch(): void {
        this.mediatorService.isSearching(false);
        if(this.searchSubscription)
            this.searchSubscription.unsubscribe();
    }


    updateSurveillance(person: RegisterPerson, add: boolean) {
        if (person === null) return;
        if (this.surveillanceResults === undefined) this.surveillanceResults = [];
        let position = this.surveillanceResults.findIndex(p => p.commonIdentifier === person.commonIdentifier);

        if (position === -1) {
            person.status = SurveillanceStatus.Synced;
            this.surveillanceResults.unshift(person);
        } else {
            if (!person.detail.surveillances.some(sur => sur.isChecked)) {
                this.surveillanceResults.splice(position, 1);
                this.personDetailList.splice(this.personDetailList
                    .findIndex(p => p.commonIdentifier === person.commonIdentifier));
            } else {
                this.surveillanceResults.splice(position, 1);
                this.surveillanceResults.unshift(person);
            }
        }

        this.pushSurveillanceStatus();
        this.surveillanceResultsSubject.next(this.surveillanceResults);
    }

    /**
     * Går gjennom alle varslingene og teller opp hvor mange som er i synk/usynk for bruker og dens prosjkets varslinger.
     * Disse blir så publisert og brukt av blant annet {@link SurveillanceStatusComponent}
     */
    pushSurveillanceStatus() {
        let status = new SurveillanceInformation;
        const name = this.userManagerService.getName();
        status.personalSynced = this.surveillanceResults.filter(p => p.status === SurveillanceStatus.Synced && p.surveillancesInfo.some(sb => sb.registeredBy === name)).length;
        status.personalUnsynced = this.surveillanceResults.filter(p => p.status === SurveillanceStatus.Unsynced && p.surveillancesInfo.some(sb => sb.registeredBy === name)).length;

        status.projectSynced = this.surveillanceResults.filter(p => p.status === SurveillanceStatus.Synced && !p.surveillancesInfo.some(sb => sb.registeredBy === name)).length;
        status.projectUnsynced = this.surveillanceResults.filter(p => p.status === SurveillanceStatus.Unsynced && !p.surveillancesInfo.some(sb => sb.registeredBy === name)).length;
        this.surveillanceStatusSubject.next(status);
    }

    private getPersonDetail(person: RegisterPerson) {
       return this.apiService.getPersonDetails(person)
           .map((res: PersonDetails) => {
               res.commonIdentifier = person.commonIdentifier;
                person.detail = res;
               this.personDetailList.push(res);
                return res;
            });
    }

    private getBusinessDetail(business: RegisterBusiness) {
        return this.apiService.getBusinessDetails(business)
            .map((res: BusinessDetails) => {
                res.commonIdentifier = business.commonIdentifier;
                business.detail = res;
                this.businessDetailList.push(res);
                return res;
            });
    }
    /**
     * Returnerer {@link PersonDetails} objektet til {@link RegisterPerson} objektet med samme commonIdentifer
     * @param person Personen man ønsker detaljer
     */
    getCachedPersonDetails(person: RegisterPerson) : Observable<PersonDetails> {
        let match = this.personDetailList.find((ele) => ele.commonIdentifier === person.commonIdentifier);
        return match != undefined ? of (match) : this.getPersonDetail(person);
    }

    getCachedBusinessDetails(business: RegisterBusiness): Observable<BusinessDetails> {
        let match = this.businessDetailList.find((ele) => ele.commonIdentifier === business.commonIdentifier);
        return match != undefined ? of(match) : this.getBusinessDetail(business);
    }


    /**
     * 
     * @param id Id'en til tage man vil ha navnet til
     * @returns Navnet til tagen med gitt id
     */
    getTagName(id: string):string {
        if (!this.tags) {
            return "";
        } 
        let tag = this.tags.find(t => t.key === id);
        return tag === undefined ? "" : tag.name;
    }

    /**
     * 
     * @param name Navnet på tagen man ønsker informasjon om
     * @returns {@link Tag} objektet for tag med gitt navn
     */
    getTagInfo(name: string): Tag {
        return this.tags.find(t => t.name === name);
    }

    /**
     * 
     * @returns Tidspunktet for sist synkronisering mot PREG, HRP og FLR
     */
    getSyncTimesAsync(): Observable<Array<[string, Date]>> {
        if (this.syncTimes)
            return of(this.syncTimes);
        return this.getSyncTimes();
    }

    private getSyncTimes(): Observable<Array<[string, Date]>> {
        return this.apiService.latestSynchronization().map((res: Array<[string, Date]>) => {
            this.syncTimes = res;
            return res;
        });
    }
}