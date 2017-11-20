import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { HttpClientModule } from "@angular/common/http";

import { ToastModule } from "ng2-toastr/ng2-toastr";
import { NgSemanticModule } from "ng-semantic";

import { AppComponent } from "./app.component";

import {IndexModule} from "./index/index.module";
import {UserModule} from "./user/user.module";
import {StatisticsModule} from "./statistics/statistics.module";
import {StaticDataCollectionModule} from "./static-data-collection/static-data-collection.module";

import {CoreModule} from "./core/core.module";
import { AppRoutingProviders, APP_ROUTES } from "./app.routes";

import "rxjs/add/operator/map";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(APP_ROUTES),
        BrowserAnimationsModule,
        CoreModule,
        IndexModule,
        StatisticsModule,
        StaticDataCollectionModule,
        UserModule,
        ReactiveFormsModule,
        NgSemanticModule,
        ToastModule.forRoot(),
    ],
    providers: [
        AppRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }