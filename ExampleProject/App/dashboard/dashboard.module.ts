import { NgModule } from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {SavedSearchTileComponent} from "./saved-search-tile/saved-search-tile.component";
import {TagTileComponent} from "./tag-tile/tag-tile.component";
import {LinksTileComponent} from "./links-tile/links-tile.component";
import {LatestCheckTileComponent} from "./latest-checks-tiles/latest-checks-tile.component";
import {CommentsTileComponent} from "./comments-tile/comments-tile.component";
import {TagListTileComponent} from "./tag-list-tile/tag-list-tile.component";
import {SharedModule} from "../shared/shared.module";
import {ApiKeyComponent} from "./apikey-tile/apikey-tile.component";
import {SurveillanceStatusTileComponent} from "./surveillance-status-tile/surveillance-status-tile.component";

@NgModule({
    imports: [SharedModule],
    declarations: [DashboardComponent, SavedSearchTileComponent, TagTileComponent, LinksTileComponent,
        LatestCheckTileComponent, CommentsTileComponent, TagListTileComponent, ApiKeyComponent, SurveillanceStatusTileComponent],
    exports: [DashboardComponent], 
})
export class DashboardModule { }