import { Component, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';

@Component({
    selector: 'chm-dashboard-announces-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DashboardAnnouncesDetailComponent {

    data: any;
    constructor(
        public bsModalRef: BsModalRef, private appDataService: AppDataService, private translate: TranslateService) {
        this.data = appDataService.getData();
        console.log('DashboardAnnouncesDetailComponent => ' + JSON.stringify(this.data));
    }

    public onCancel(): void {
        this.bsModalRef.hide();
    }
}
