import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatementsComponent } from 'app/pages/statements/statements.component';

const routes: Routes = [
    {
        path: '',
        component: StatementsComponent,
        data: { navTitle: 'statements' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatementsRoutingModule { }

export const routedComponents = [StatementsComponent];
