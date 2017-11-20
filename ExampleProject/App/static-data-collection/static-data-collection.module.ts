import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';



import { PersonDataComponent } from './person-data/person-data.component';
import { StaticDataSharedComponent } from "./shared/static-data-shared.component";
import { ContactInformationComponent } from "./contact-information/contact-information.component";
import {AdminStaticDataComponent} from "./admin/admin-static-data.component";
import {AdminStaticTableComponent} from "./admin/admin-static-table.component";
import {BusinessDataComponent} from "./business-data/business-data.component";

@NgModule({
    imports: [CommonModule, FormsModule, NgPipesModule],
    exports: [StaticDataSharedComponent],
    declarations: [StaticDataSharedComponent, ContactInformationComponent, PersonDataComponent, AdminStaticDataComponent, BusinessDataComponent, AdminStaticTableComponent],
    providers: [],
})
export class StaticDataCollectionModule { }
