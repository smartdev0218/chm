import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessengerComponent } from './messenger.component';

const routes: Routes = [
    {
        path: '',
        component: MessengerComponent,
        data: { navTitle: 'Messenger' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessengerRoutingModule {
}

export const routedComponents = [MessengerComponent];
