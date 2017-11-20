import {NgModule} from "@angular/core";
import {SearchFilterModule} from "../search-filter/search-filter.module";
import {DashboardModule} from "../dashboard/dashboard.module";
import {SurveillanceModule} from "../surveillance/surveillance.module";
import {SearchResultModule} from "../search-result/search-result.module";

import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {IndexComponent} from "./index.component";

@NgModule({
    imports: [CoreModule, SharedModule, SearchFilterModule, DashboardModule, SurveillanceModule, SearchResultModule],
    declarations: [IndexComponent],
    exports: [IndexComponent],
    providers: []
})
export class IndexModule {}