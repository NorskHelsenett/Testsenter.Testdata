import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";

import {RegisterPerson, FilterItem, UserData, SearchQuery } from "../../models/DataModels";
import {ChildViews, ErrorMessage, HodorIndexes } from "../../models/UtilityModels";

/**
 * 
 */
@Injectable()
export class MediatorService {
    // Sources
    private _surveillanceRemoved = new Subject<RegisterPerson>();
    private _surveillanceAdded = new Subject<RegisterPerson>();
    private _filterChange = new Subject<FilterItem[]>();
    private _searching = new Subject<boolean>();
    private _changeMainView = new Subject<ChildViews>();
    private _userInfo = new ReplaySubject<UserData>(1);
    private _performeSearch = new Subject();
    private _clearSearchTerm = new Subject();
    private _searchTerm = new ReplaySubject<SearchQuery>(1);
    private _errorMessage = new ReplaySubject<ErrorMessage>(1);
    private _updateSavedSearches = new Subject();
    private _indexSwitch = new ReplaySubject<HodorIndexes>(1);

    surveillancerRemoved$ = this._surveillanceRemoved.asObservable();
    surveillanceAdded$ = this._surveillanceAdded.asObservable();
    searching$ = this._searching.asObservable();
    changeMainView$ = this._changeMainView.asObservable();
    userInfo$ = this._userInfo.asObservable();
    filterChange$ = this._filterChange.asObservable();
    performeSearch$ = this._performeSearch.asObservable();
    clearSearchTerm$ = this._clearSearchTerm.asObservable();
    searchTerm$ = this._searchTerm.asObservable();
    errorMessage$ = this._errorMessage.asObservable();
    updateSavedSearches$ = this._updateSavedSearches.asObservable();
    indexSwitch$ = this._indexSwitch.asObservable();

    notifyAboutDeletedSurveillance(person: RegisterPerson) {
        this._surveillanceRemoved.next(person);
    }

    notifyAboutAddedSurveillance(person: RegisterPerson) {
        this._surveillanceAdded.next(person);
    }


    filterChanged(change:FilterItem[]) {
        this._filterChange.next(change);
    }

    isSearching(value:boolean) {
        this._searching.next(value);
    }


    changeMainView(view:ChildViews) {
        this._changeMainView.next(view);
    }

    pushUserInfo(user: UserData) {
        this._userInfo.next(user);
    }

    performeSearch() {
        this._performeSearch.next();
    }

    clearSearchTerm() {
        this._clearSearchTerm.next();
    }

    searchTerm(term:SearchQuery) {
        this._searchTerm.next(term);
    }

    setErrorMessage(message: ErrorMessage) {
        this._errorMessage.next(message);
    }

    updateSavedSearches() {
        this._updateSavedSearches.next();
    }

    switchIndex(switchTo: HodorIndexes) {
        this._indexSwitch.next(switchTo);
    }
    
}