import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplesComponent } from 'app/pages/samples/samples.component';


const routes: Routes = [
    {
        path: '',
        component: SamplesComponent,
        data: { navTitle: 'Samples' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SamplesRoutingModule { }

export const routedComponents = [SamplesComponent];
