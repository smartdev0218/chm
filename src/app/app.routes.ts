import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { AppComponent } from './app.component';
import { CanActivateGuard } from 'app/services/can-activate-guard.service';
import { LayoutAuthComponent } from 'app/layouts/auth/auth';
import { LayoutLoginComponent } from 'app/layouts/login/login.component';
import { LayoutRegisterComponent } from 'app/layouts/register/register.component';

const routes: Routes = [
  // not logged routes
  { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  // logged routes
  {
    path: '',
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-blue-light',
      'display_tasks': false,
      'display_menu_search': false,
      'display_control': false,
      // 'header_components': [{
      //   class: HeaderWidgetComponent,
      //   data: {
      //     label: 'test widget'
      //   }
      // }]
    }],
    canActivate: [CanActivateGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
      , { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', canActivate: [CanActivateGuard] }
      , { path: 'presets', loadChildren: 'app/pages/presets/presets.module#PresetsModule', canActivate: [CanActivateGuard] }
      , { path: 'inventory', loadChildren: 'app/pages/inventory/inventory.module#InventoryModule', canActivate: [CanActivateGuard] }
      , { path: 'publications', loadChildren: 'app/pages/publications/publications.module#PublicationsModule', canActivate: [CanActivateGuard] }
      , { path: 'publication-results', loadChildren: 'app/pages/publications/results/publication-results.module#PublicationResultsModule', canActivate: [CanActivateGuard] }
      , { path: 'categories', loadChildren: 'app/pages/configuration/categories/config-categories.module#ConfigCategoriesModule', canActivate: [CanActivateGuard] }
      , { path: 'credentials', loadChildren: 'app/pages/configuration/credentials/credentials.module#CredentialsModule', canActivate: [CanActivateGuard] }
      , { path: 'colors', loadChildren: 'app/pages/configuration/colors/colors.module#ColorsModule', canActivate: [CanActivateGuard] }
      , { path: 'brands', loadChildren: 'app/pages/configuration/brands/brands.module#BrandsModule', canActivate: [CanActivateGuard] }
      , { path: 'methods', loadChildren: 'app/pages/configuration/methods/methods.module#MethodsModule', canActivate: [CanActivateGuard] }
      , { path: 'reports', loadChildren: 'app/pages/reports/reports.module#ReportsModule', canActivate: [CanActivateGuard] }
      , { path: 'samples', loadChildren: 'app/pages/samples/samples.module#SamplesModule', canActivate: [CanActivateGuard] }
      , { path: 'messenger', loadChildren: 'app/pages/messenger/messenger.module#MessengerModule', canActivate: [CanActivateGuard] }
      , { path: 'statements', loadChildren: 'app/pages/statements/statements.module#StatementsModule', canActivate: [CanActivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
