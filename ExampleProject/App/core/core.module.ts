import { NgModule, SkipSelf, Optional  } from '@angular/core'
import { CommonModule } from '@angular/common';

import { UserManagerService } from "./services/user-manager.service";
import { ApiService } from "./services/api.service";
import { SearchManagerService } from "./services/search-manager.service";
import { MediatorService } from "./services/mediator.service";
import { FilterManagerService } from "./services/filter-manager.service";
import { DataManagerService } from "./services/data-manager.service";
import {TitleComponent} from "./title/title.component";
import {UserInformationComponent} from "./title/user-information/user-information.component";
import {SharedModule} from "../shared/shared.module";
import {CommentsManagerService} from "./services/comments-manager.service";
import {CodeManagerService} from "./services/codes-manager.service";

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [TitleComponent, UserInformationComponent],
    exports: [TitleComponent],
    providers: [UserManagerService, ApiService, FilterManagerService, SearchManagerService, MediatorService, DataManagerService, CommentsManagerService, CodeManagerService]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}