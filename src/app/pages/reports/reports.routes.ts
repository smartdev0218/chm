import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from 'app/pages/reports/reports.component';



const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        data: { navTitle: 'Reports' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }

export const routedComponents = [ReportsComponent];
