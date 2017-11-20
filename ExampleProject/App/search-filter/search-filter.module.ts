import { NgModule } from "@angular/core";
import {SearchBoxComponent} from "./search-box/search-box.component";
import {SavedSearchComponent} from "./saved-search/saved-search.component";
import {FilterGroupComponent} from "./filter/filter-group.component";
import {FilterContainerComponent} from "./filter/filter-container.component";
import {AgeBoxComponent} from "./filter/filtertypes/agebox/agebox.component";
import {ChildrenFilterComponent} from "./filter/filtertypes/children/children-filter.component";
import {ParentFilterComponent} from "./filter/filtertypes/parent/parent-filter.component";
import {TagFilterComponent} from "./filter/filtertypes/tagfilter/tagfilter.component";
import {FilterGroupPipe} from "./filter/filtergroup.pipe";
import { SharedModule } from "../shared/shared.module";
import {SavedSearchPipe} from "./saved-search/saved-search.pipe";
import {RegisterFilterFullNamePipe} from "../shared/shared-pipes/registerfullname.pipe";

@NgModule({
    imports: [SharedModule],
    declarations: [SearchBoxComponent, SavedSearchComponent, FilterGroupComponent, FilterContainerComponent,
        AgeBoxComponent, ChildrenFilterComponent, ParentFilterComponent, TagFilterComponent, FilterGroupPipe,
        SavedSearchPipe],
    providers: [SavedSearchPipe, RegisterFilterFullNamePipe ],
    exports: [SearchBoxComponent, FilterContainerComponent]
})
export class SearchFilterModule { }