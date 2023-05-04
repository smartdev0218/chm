import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from 'app/pages/configuration/brands/brands.component';

const routes: Routes = [
    {
        path: '',
        component: BrandsComponent,
        data: { navTitle: 'Brands' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandsRoutingModule { }

export const routedComponents = [BrandsComponent];
