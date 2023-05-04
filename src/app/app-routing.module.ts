import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutAuthComponent } from 'app/layouts/auth/auth';
import { CanActivateGuard } from 'app/services/can-activate-guard.service';


// no navTitle here
const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadChildren: 'app' },
    {
        path: '',
        component: LayoutAuthComponent,
        canActivate: [CanActivateGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [CanActivateGuard] },
            // { path: 'presets', loadChildren: 'app/presets/presets.module#PresetsModule', canActivate: [AuthGuard] },
            { path: 'presets', loadChildren: 'app/modelos/modelos.module#ModelosModule', canActivate: [CanActivateGuard] },
            { path: 'inventory', loadChildren: 'app/inventory/inventory.module#InventoryModule', canActivate: [CanActivateGuard] },
            { path: 'reports', loadChildren: 'app/reports/reports.module#ReportsModule', canActivate: [CanActivateGuard] },
            // tslint:disable-next-line:max-line-length
            { path: 'publicaciones', loadChildren: 'app/publicaciones/publicaciones.module#PublicacionesModule', canActivate: [CanActivateGuard] },
            { path: 'publications/1/results', loadChildren: 'app/publications/results/publication-results.module#PublicationResultsModule', canActivate: [CanActivateGuard] },
            { path: 'config/categories', loadChildren: 'app/configuration/categories/config-categories.module#ConfigCategoriesModule', canActivate: [CanActivateGuard] }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PreloadAllModules]
})
export class AppRoutingModule { }
