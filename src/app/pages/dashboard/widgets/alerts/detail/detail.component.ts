import { Component, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';

const ALERT_TYPES: string[] = [
    'Estado canal',
    'Tipo A',
    'Tipo B'
];

@Component({
    selector: 'chm-dashboard-alerts-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DashboardAlertsDetailComponent {

    alertTypes = ALERT_TYPES;

    data: any;

    constructor(
        public bsModalRef: BsModalRef, private appDataService: AppDataService) {
        this.data = appDataService.getData();
    }

    public onCancel(): void {
        this.bsModalRef.hide();
    }
}
