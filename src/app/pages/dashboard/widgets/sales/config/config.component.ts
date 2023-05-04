import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';

@Component({
    selector: 'chm-dashboard-sales-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class DashboardSalesConfigComponent implements OnInit {

    isLoading = false;
    intervals: any;
    primarySelectedInterval: any;
    secondarySelectedInterval: any;
    tertiarySelectedInterval: any;

    data: any;
    public onClose: Subject<any>;

    constructor(public bsModalRef: BsModalRef, private appDataService: AppDataService) {
        this.data = appDataService.getData();
        console.log('DashboardTopConfigComponent => ' + JSON.stringify(this.data));
    }

    ngOnInit() {
        this.onClose = new Subject();
        console.log('dialog.data => ' + JSON.stringify(this.data));
        this.isLoading = true;
        this.intervals = this.data.input.intervals;
        const selectedIntervals = this.data.input.selectedIntervals;

        for (const interval of selectedIntervals) {
            // console.log(JSON.stringify(interval));
            if (interval.key === 'WIDGET_SELLS_TIPO_INTERVALO_1') {
                this.primarySelectedInterval = this.getIntervalById(interval.value);
            } else if (interval.key === 'WIDGET_SELLS_TIPO_INTERVALO_2') {
                this.secondarySelectedInterval = this.getIntervalById(interval.value);
            } else if (interval.key === 'WIDGET_SELLS_TIPO_INTERVALO_3') {
                this.tertiarySelectedInterval = this.getIntervalById(interval.value);
            }
        }

        // console.log('primarySelectedIntervalId => ' + JSON.stringify(this.primarySelectedInterval));
        // console.log('secondarySelectedIntervalId => ' + JSON.stringify(this.secondarySelectedInterval));
        // console.log('tertiarySelectedIntervalId => ' + JSON.stringify(this.tertiarySelectedInterval));
        this.isLoading = false;
    }

    getIntervalById(id: any) {
        const filtered = this.intervals.filter(i => i.id === id);
        return (filtered.length) ? filtered[0] : this.intervals[0];
    }

    public onSubmit(): void {
        this.onClose.next([this.primarySelectedInterval, this.secondarySelectedInterval, this.tertiarySelectedInterval]);
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(null);
        this.bsModalRef.hide();
    }
}
