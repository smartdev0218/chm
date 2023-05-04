import { Component, Input } from '@angular/core';

@Component({
    selector: 'chm-dashboard-status-sign',
    templateUrl: './status-sign.component.html'
})
export class DashboardStatusSignComponent {
    @Input('status') status: number;
}
