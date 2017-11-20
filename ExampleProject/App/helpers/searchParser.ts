

import {SearchType} from "../models/UtilityModels";

export class SearchParser {
    private _term: string;
    type: SearchType;

    constructor(term: string) {
        this._term = term;
        this.type = this.getSearchType(term);
    }

    get term():string {
        return this._term;
    }

    set term(searchTerm:string) {
        this._term = searchTerm;
        this.type = this.getSearchType(searchTerm);
    }


    getSearchType(term: string): SearchType {
        if (term === "" || term === undefined) return SearchType.Empty;
        if (isNaN(+term)) return SearchType.Name;
        if (term.length >= 7 && term.length <= 9) return SearchType.Number;
        if (term.length === 11) return SearchType.NIN;
        return SearchType.Query;
    }
}