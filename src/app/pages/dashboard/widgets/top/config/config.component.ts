
import { Component, Inject, OnInit } from '@angular/core';

import { TopConfig, Interval } from '../top.models';
import { MOCK_CONSTANTS_INTERVALS } from 'app/mock-api';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from 'environments/environment';
import { AppDataService } from 'app/shared/app-data.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'chm-dashboard-top-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class DashboardTopConfigComponent implements OnInit {

    isLoading = false;

    selectedIntervalId: any;
    intervals: Interval[] = [];

    data: any;
    public onClose: Subject<any>;

    constructor(
        public bsModalRef: BsModalRef, private appDataService: AppDataService) {
        this.data = appDataService.getData();
        console.log('DashboardTopConfigComponent => ' + JSON.stringify(this.data));
    }

    ngOnInit() {
        this.onClose = new Subject();

        console.log('dialog.data => ' + JSON.stringify(this.data.input));
        this.isLoading = true;
        if (environment.mock) {
            this.intervals = MOCK_CONSTANTS_INTERVALS;
            this.selectedIntervalId = this.data.input.selectedInterval.id;
            this.isLoading = false;
        } else {
            this.intervals = this.data.input.intervals;
            this.selectedIntervalId = this.data.input.selectedInterval.id;
            this.isLoading = false;
        }

        // console.log('data => ' + JSON.stringify(this.data));
        // console.log('intervals => ' + JSON.stringify(this.intervals));
        // console.log('selectedInterval => ' + JSON.stringify(this.selectedInterval));
    }

    public onSubmit(): void {
        this.onClose.next({ selectedIntervalId: this.selectedIntervalId });
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(null);
        this.bsModalRef.hide();
    }

}
