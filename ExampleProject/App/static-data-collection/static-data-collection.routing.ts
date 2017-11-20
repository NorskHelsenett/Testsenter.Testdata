import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaticDataSharedComponent} from "./shared/static-data-shared.component";
const routes: Routes = [
    { path: '', component: StaticDataSharedComponent },
    { path: "**", redirectTo: "" }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);