import { NgModule } from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {PersonProfessionalComponent} from "./tabs/person/professional/person-professional.component";
import {PersonPersonalComponent} from "./tabs/person/personal/person-personal.component";
import {PersonDifiComponent} from "./tabs/person/difi/person-difi.component";
import {PersonNotificationsComponent} from "./tabs/person/notifications/person-notifications.component";
import {PersonOverviewComponent} from "./tabs/person/overview/person-overview.component";
import {InformationContainerComponent} from "./tabs/information-container/information-container.component";
import {SearchListComponent} from "./search-result-list/search-list.component";
import {PersonSearchListComponent} from "./search-result-list/person-search-list/person-search-list.component";
import {BusinessSearchListComponent} from "./search-result-list/business-search-list/business-search-list.component";
import {BusinessBedRegComponent} from "./tabs/business/bedreg/business-bedreg.component";
import {BusinessArComponent} from "./tabs/business/ar/business-ar.component";
import {BusinessOverviewComponent} from "./tabs/business/overview/business-overview.component";
import { ActiveFiltersComponent } from "./active-filters/active-filters.component";
import {PersonDetailComponent} from "./search-result-details/person-detail/person-detail.component";
import {PersonSearchDetailComponent} from "./search-result-details/person-search-detail/person-search-detail.component";
import {BusinessDetailComponent} from "./search-result-details/business-detail/business-detail.component";
import {BusinessSearchDetailComponent} from
    "./search-result-details/business-search-detail/business-search-details.component";
import {BusinessFlrComponent} from "./tabs/business/flr/business-flr.component";

@NgModule({
    imports: [SharedModule],
    declarations: [PersonDetailComponent, PersonOverviewComponent, PersonProfessionalComponent, PersonPersonalComponent,
        PersonDifiComponent, PersonNotificationsComponent, InformationContainerComponent, PersonSearchDetailComponent, 
        SearchListComponent, PersonSearchListComponent, BusinessSearchListComponent, BusinessDetailComponent, BusinessSearchDetailComponent,
        ActiveFiltersComponent, BusinessArComponent, BusinessBedRegComponent, BusinessOverviewComponent, BusinessFlrComponent],
    exports: [PersonDetailComponent, PersonSearchDetailComponent, SearchListComponent]
})
export class SearchResultModule { }