import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MethodsComponent } from 'app/pages/configuration/methods/methods.component';

const routes: Routes = [
    {
        path: '',
        component: MethodsComponent,
        data: { navTitle: 'Methods' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MethodsRoutingModule { }

export const routedComponents = [MethodsComponent];
