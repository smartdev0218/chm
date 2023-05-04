import { Component, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';

@Component({
    selector: 'chm-dashboard-alerts-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class DashboardAlertsConfigComponent {

    data: any;

    constructor(
        public bsModalRef: BsModalRef, private appDataService: AppDataService) {
        this.data = appDataService.getData();
    }

    public onCancel(): void {
        this.bsModalRef.hide();
    }
}
