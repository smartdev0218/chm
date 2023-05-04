import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationsComponent } from 'app/pages/publications/publications.component';
import { PublicationsFormComponent } from './publications-form/publications-form.component';
import { PublicationsListComponent } from 'app/pages/publications/publications-list/publications-list.component';
import { WorkflowGuard } from 'app/pages/publications/publications-form/workflow/workflow-guard.service';
import { ResultComponent } from 'app/pages/publications/publications-form/result/result.component';
import { GeneralComponent } from 'app/pages/publications/publications-form/general/general.component';
import { ProductsComponent } from 'app/pages/publications/publications-form/products/products.component';
import { ModelsComponent } from 'app/pages/publications/publications-form/models/models.component';
const routes: Routes = [
    {
        path: '',
        component: PublicationsComponent,
        children: [
            { path: '', component: PublicationsListComponent },
            { path: 'results/:id', loadChildren: 'app/pages/publications/results/publication-results.module#PublicationResultsModule' },
            { path: 'form/general/:id', component: PublicationsFormComponent },
            {
                path: 'form',
                component: PublicationsFormComponent,
                children: [
                    // 1st Route
                    { path: 'general', component: GeneralComponent },
                    // 2nd Route
                    { path: 'products', component: ProductsComponent, canActivate: [WorkflowGuard] },
                    // 3rd Route
                    { path: 'models', component: ModelsComponent, canActivate: [WorkflowGuard] },
                    // 4th Route
                    { path: 'result', component: ResultComponent, canActivate: [WorkflowGuard] },
                    // 5th Route
                    { path: '', redirectTo: '/publications/form/general', pathMatch: 'full' },
                    // 6th Route
                    { path: '**', component: GeneralComponent }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [WorkflowGuard]
})
export class PublicationsRoutingModule { }

export const routedComponents = [
    PublicationsComponent
    , PublicationsListComponent
    , PublicationsFormComponent
];
