import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { ToastsManager } from "ng2-toastr/ng2-toastr";

import {MediatorService} from "./mediator.service";
import {Search, RegisterPerson, SearchResult, RegisterBusiness, SurveillanceResult, PersonDetails, BusinessDetails,
    FilterGroup, UserData, LoginSubmission, Tag, SearchQuery, Comment } from "../../models/DataModels";
import {HodorIndexes, ErrorMessage } from "../../models/UtilityModels";
import * as endpoints from "../../resources/api-routes";
import { Family } from "../../shared/detailedWindow/family/familymodels";

/**
 * Håndterer alle api-kall til serveren
 */
@Injectable()
export class ApiService {

    
    constructor(private http: HttpClient, private toastr: ToastsManager, private mediator:MediatorService) { }

    /**
     * Kaller server for å utføre personsøk
     * @param query
     */
    personSearch(query: Search): Observable<SearchResult<RegisterPerson>> {
        return this.http.post<SearchResult<RegisterPerson>>(endpoints.apiPersonSearch(query.searchParameters.environment), query);
    }

    /**
     * Kaller server for å utføre virksomhetssøk
     * @param query
     */
    buisnessSearch(query: Search): Observable<SearchResult<RegisterBusiness>> {
        return this.http.post <SearchResult<RegisterBusiness>>(endpoints.apiBusinessSearch(query.searchParameters.environment), query);
    }

    /**
     * Henter inn oppsatte varslinger for brukerens prosjekt
     */
    getSurveillanceForProject(): Observable<SurveillanceResult[]> {
        return this.http.get<SurveillanceResult[]>(endpoints.apiProjectSurveillance);
    }

    //Surveillances

    /**
     * Registerer ny varsling på person
     * @param url 
     * @param body Personens nåværende verdier
     */
    postSurveillance(url: string, body: string): Observable<boolean> {
        return this.http.post<boolean>(`${url}`, JSON.stringify(body), { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    }

    /**
     * Fjerner en varsling av en person
     * @param url
     */
    deleteSurveillance(url: string): Observable<boolean> {
        return this.http.delete<boolean>(`${url}`);
    }


    acceptChanges(url: string, body: string): Observable<boolean> {
        return this.http.put<boolean>(url, JSON.stringify(body), { headers: new HttpHeaders().set('Content-Type', 'application/json') });
    } 

    // Person details

    /**
     * Henter inn detaljer (PREG, HRP, FLR, Difi json osv.) for person i søkeresultat
     * @param person
     */
    getPersonDetails(person: RegisterPerson): Observable<PersonDetails> {
        return this.http.post<PersonDetails>(endpoints.apiPersonDetail, person);
    }

    /**
     * Henter inn detaljer (AR, BedReg, Htk, Resh json osv.) for virksomhet i søkeresultat
     * @param person
     */
    getBusinessDetails(person: RegisterBusiness): Observable<BusinessDetails> {
        return this.http.post<BusinessDetails>(endpoints.apiBusinessDetail, person);
    }


    /**
     * Henter inn familien til personen med angitt Nin
     * @param nin Nin til personen man ønsker å hente familen til.
     */
    getFamily(nin: string):Observable<Family> {
        let url = endpoints.apiGetFamily.concat(nin);
        return this.http.get<Family>(url);
    }

    getFilters(index:HodorIndexes): Observable<FilterGroup[]> {
        return this.http.get<FilterGroup[]>(endpoints.apiGetFilters(index));

    }

    //User

    getUser(): Observable<UserData> {
        return this.http.get<UserData>(endpoints.apiGetUser);
    }

    isLoggedIn(): Observable<boolean> {
        return this.http.get<boolean>(endpoints.apiIsLoggedIn);
    }

    logIn(data: LoginSubmission): Observable<string> {
        return this.http.post<string>(endpoints.apiLogIn, data);
    }

    logOut(): Observable<boolean> {
        return this.http.get<boolean>(endpoints.apiLogOut);
    }
    createUser(user: UserData): Observable<string> {
        return this.http.post<string>(endpoints.apiCreateUser, user);
    }

    updateUser(user: UserData): Observable<string> {
        return this.http.put<string>(endpoints.apiUpdateUser, user);
    }
    updateRegisterUser(form: LoginSubmission): Observable<boolean> {
        return this.http.post<boolean>(endpoints.apiUpdateRegisterUser, form);
    }

    hasValidRegisterUser(): Observable<boolean> {
        return this.http.get < boolean>(endpoints.apiHasValidRegisterUser).catch
            ((error: any) => {
                console.log("Got error in api service");
                this.customeErrorHandling(new ErrorMessage("Kunne ikke oppnå kontakt med RegisterPlattformen"));
                return of(false);
        });
    }

    checkRegisterUser(form: LoginSubmission): Observable<boolean> {
        return this.http.post<boolean>(endpoints.apiCheckRegisterUser, form);
    }

    getIndexedProjectSurveillances(projectid: number): Observable<RegisterPerson[]> {
        return this.simpleGetRequest<RegisterPerson[]>(endpoints.apiIndexedProjectSurveillance.concat(String(projectid)));
    }

    validUserInformation():Observable<boolean> {
        return this.http.get<boolean>(endpoints.apiValidUserInformation);
    }

    generateNewPassword(username: string): Observable<string> {
        return this.http.get<string>(endpoints.apiGenerateNewPassword.concat(username));
    }

    // Tags
    getTags(): Observable<Tag[]> {
        return this.simpleGetRequest<Tag[]>(endpoints.apiGetTags);
    }

    addTag(id: string, tag: string, index: HodorIndexes): Observable<Tag> {
        return this.http.put<Tag>(endpoints.apiUpdateTag.concat(`?commonIdentifier=${id}&tag=${tag}&index=${HodorIndexes[index]}`),
                {});
    }
    removeTag(id: string, tag: string, index: HodorIndexes): Observable<boolean> {
        return this.http.delete<boolean>(endpoints.apiUpdateTag.concat(`?commonIdentifier=${id}&tag=${tag}&index=${HodorIndexes[index]}`));
    }

    deleteTag(tag: string): Observable<boolean>{
        return this.http.delete<boolean>(endpoints.apiDeleteTag.concat(`?tag=${tag}`)).catch(this.handleHttpError);
    }


    // Saved search
    saveSearch(search: SearchQuery): Observable<SearchQuery>{
        return this.http.post<SearchQuery>(endpoints.apiSavedSearches, search).catch(this.handleHttpError);
    }

    deleteSearch(search: SearchQuery):Observable<boolean> {
        return this.http.delete<boolean>(endpoints.apiSavedSearches.concat(`?dbname=${search.dbName}`)).catch(this.handleHttpError);
        
    }

    getSavedSearches(): Observable<SearchQuery[]> {
        return this.simpleGetRequest<SearchQuery[]>(endpoints.apiSavedSearches);
    }

    // Comments 
    addComment(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(endpoints.apiComments, comment).catch(this.handleHttpError);
    }

    removeComment(comment: Comment): Observable<boolean> {
        return this.http.delete<boolean>(endpoints.apiComments
            .concat(`?key=${comment.key}&commonIdentifier=${comment.commonIdentifier}`),).catch(this.handleHttpError);
    }

    getAllComments(): Observable<Comment[]> {
        return this.simpleGetRequest<Comment[]>(endpoints.apiComments);
    }

    //Misc
    latestSynchronization():Observable<Array<[string, Date]>> {
        return this.simpleGetRequest<Array<[string,Date]>>(endpoints.apiLastestSync);
    }


    simpleGetRequest<T>(url: string, callback?: (error: any) => any): Observable<T> {
        return this.http.get<T>(url);
    }


    simplePostRequest<T>(url: string, data: any, callback?: (error:any) => any): Observable<T> {
        return this.http.post<T>(url, data);
    }

    asyncPostRequest<T>(url: string, data: any, callback?: (error: any) => any): Observable<T> {
        return this.http.post<T>(url, data);
    }


    private handleHttpError(error: any) {
        let errMsg = error.message ? error.message : error.toString();
        console.error(errMsg);
        this.toastr.error(errMsg);
        return Observable.throw(errMsg);
    }

    private customeErrorHandling(error: ErrorMessage):void {
        this.mediator.setErrorMessage(error);
    }

    private handleError(error: any): Promise<any> {
        let friendlyMessage = "";
        //if error.status is not set it's an error from angular http
        if (!error.status) {
            console.log("Got error when doing http server call in api.service.ts: ");
            console.log(error.message || error);
            return Promise.reject("Noe gikk galt da websiden prøvde å kommunisere med server");
        }

        if (error.status === 404)
            friendlyMessage = "Oppnår ikke kontakt med tjener. Prøv igjen senere";
        return Promise.reject(friendlyMessage || error.status + " " + error.statusText);
    }

   
}