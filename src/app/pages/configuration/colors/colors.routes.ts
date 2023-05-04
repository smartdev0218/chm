import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorsComponent } from 'app/pages/configuration/colors/colors.component';

const routes: Routes = [
    {
        path: '',
        component: ColorsComponent,
        data: { navTitle: 'Colors' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColorsRoutingModule { }

export const routedComponents = [ColorsComponent];
