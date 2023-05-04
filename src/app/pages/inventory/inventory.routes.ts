import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from 'app/pages/inventory/inventory.component';


const routes: Routes = [
    {
        path: '',
        component: InventoryComponent,
        data: { navTitle: 'Inventory' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }

export const routedComponents = [InventoryComponent];
