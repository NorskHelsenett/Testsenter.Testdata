import { NgModule } from "@angular/core";
import {SurveillanceListComponent} from "./surveillance-list/surveillance-list.component";
import {SurveillanceOverviewComponent} from "./surveillance-overview/surveillance-overview.component";
import {SharedModule} from "../shared/shared.module";
import {TeamFilterPipe} from "./teamsurveillance.pipe";
import {SearchResultModule} from "../search-result/search-result.module";

@NgModule({
    imports: [SharedModule, SearchResultModule],
    declarations: [SurveillanceListComponent, SurveillanceOverviewComponent, TeamFilterPipe],
    exports: [SurveillanceOverviewComponent],
    providers: [TeamFilterPipe]
})
export class SurveillanceModule { }