import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresetsComponent } from 'app/pages/presets/presets.component';
import { PresetsFormComponent } from 'app/pages/presets/presets-form/presets-form.component';



const routes: Routes = [
    {
        path: '',
        component: PresetsComponent,
        data: { navTitle: 'Presets' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PresetsRoutingModule { }

export const routedComponents = [PresetsComponent];
