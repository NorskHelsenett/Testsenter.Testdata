import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FileSelectDirective } from 'ng2-file-upload';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgPipesModule } from "ngx-pipes";


import { StatisticsIndexComponent } from './statistics-index.component';
import {StatisticsOverviewComponent} from "./overview/statistics-overview.component";
import {StatisticsCorrelationComponent} from "./correlation/statistics-correlation.component";
import {StatisticsDetailedComponent} from "./detailed/statistics-detailed.component";
import { StatisticsGroupsComponent } from "./groups/statistics-group.component";
import { StatisticsCompareComponent } from "./compare/statistics-compare.component";
@NgModule({
    imports: [FormsModule, BrowserModule, NgxChartsModule, NgPipesModule],
    exports: [StatisticsIndexComponent],
    declarations: [StatisticsIndexComponent, StatisticsOverviewComponent, StatisticsCorrelationComponent, StatisticsDetailedComponent, StatisticsGroupsComponent,
        StatisticsCompareComponent, FileSelectDirective],
    providers: [],
})
export class StatisticsModule { }
