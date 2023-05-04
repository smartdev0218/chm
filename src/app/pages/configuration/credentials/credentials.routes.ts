import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialsComponent } from 'app/pages/configuration/credentials/credentials.component';

const routes: Routes = [
    {
        path: '',
        component: CredentialsComponent,
        data: { navTitle: 'credentials' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CredentialsRoutingModule { }

export const routedComponents = [CredentialsComponent];
