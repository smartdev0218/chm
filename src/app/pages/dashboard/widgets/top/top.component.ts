

import { MOCK_TOP_SELLS, MOCK_TOP_SELLS_CONFIG, MOCK_CONSTANTS_INTERVALS } from 'app/mock-api';

import { Component, OnInit } from '@angular/core';

import { DashboardTopConfigComponent } from './config/config.component';
import { DashboardTopService } from './top.service';

import { TopConfig, TopSell, Interval } from './top.models';

import { List } from 'linqts'; // https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx
import { Observable } from 'rxjs/Observable';
import { StoreService } from 'app/shared/store.service';
import { HermesService } from 'app/shared/hermes.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { environment } from 'environments/environment';
import { AppDataService } from '../../../../shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';

@Component({
    selector: 'chm-dashboard-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.css']
})
export class DashboardTopComponent implements OnInit {

    bsModalRef: BsModalRef;
    topSells = [];
    isLoading = false;
    config: any;
    maxNumSells: number;

    intervals: Interval[] = [];
    selectedInterval: Interval;

    constructor(
        private modalService: BsModalService,
        private topService: DashboardTopService,
        private storeService: StoreService,
        private hermes: HermesService,
        private appDataService: AppDataService,
        private translate: TranslateService
    ) {
        storeService.siteChanged$.subscribe(id => this.onSiteChanged(id));
    }

    ngOnInit() {
        this.updateStatus();
    }

    onSiteChanged(id: number) {
        this.updateStatus();
    }

    updateStatus() {
        this.isLoading = true;

        if (environment.mock) {
            this.topSells = MOCK_TOP_SELLS;
            const arr: List<any> = new List<any>(MOCK_TOP_SELLS);
            this.maxNumSells = arr.OrderByDescending(x => Number(x.numSells)).FirstOrDefault().numSells;

            this.config = MOCK_TOP_SELLS_CONFIG[0];

            this.intervals = MOCK_CONSTANTS_INTERVALS;
            this.selectedInterval = this.getSelectedInterval();
            this.isLoading = false;
        } else {

            this.topService.getTopSells()
                .subscribe(
                    res => {
                        // this.isLoading = false;
                        this.topSells = res;
                        const arr: List<any> = new List<any>(this.topSells);
                        this.maxNumSells = arr.OrderByDescending(x => Number(x.numSells)).FirstOrDefault().numSells;
                        // this.isLoading = false;
                    },
                    err => {
                        // this.isLoading = false;
                        console.log(err);
                    }
                );

            this.getPopupData().subscribe(
                res => {
                    this.config = res.topConfig[0];
                    this.intervals = res.intervals;
                    this.selectedInterval = this.getSelectedInterval();
                    this.isLoading = false;

                },
                err => {
                    // this.isLoading = false;
                    console.log(err);
                }
            );

        }
    }

    openConfigurationDialog() {
        const dialogData = { intervals: this.intervals, selectedInterval: this.selectedInterval };
       
        this.appDataService.setData({ input: dialogData });
        // https://github.com/valor-software/ngx-bootstrap/issues/2460
        this.bsModalRef = this.modalService.show(DashboardTopConfigComponent, { backdrop: 'static' });

        (<DashboardTopConfigComponent>this.bsModalRef.content).onClose.subscribe(result => {
            if (result) {
                this.topService.setTopConfig(result.selectedIntervalId)
                    .subscribe(
                        res => {
                            this.config = res;
                            
                            this.updateStatus();
                        },
                        err => {
                            console.log(err.message);
                        }
                    );
            }
        });

        // const dialogRef = this.dialog.open(DashboardTopConfigComponent, { data: dialogData });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('setConfig : ' + JSON.stringify(result));
        //     if (result) {
        //         this.topService.setTopConfig(result)
        //             .subscribe(
        //                 res => {
        //                     this.config = res;
        //                     this.snack.open('La configuración se ha guardado con éxito', undefined, { duration: 4000 });
        //                     this.updateStatus();
        //                 },
        //                 err => {
        //                     this.snack.open(err.message, undefined, { duration: 10000 });
        //                 }
        //             );
        //     }
        // });
    }

    getSelectedInterval() {
        const filtered = this.intervals.filter(i => i.id === Number(this.config.value));
        return (filtered.length) ? filtered[0] : this.intervals[0];
    }

    getPopupData(): Observable<any> {
        return Observable.forkJoin([
            this.topService.getTopConfig(),
            this.hermes.getIntervals()
        ])
            .map((data: any[]) => {
                let popupData: any = {};
                popupData.topConfig = data[0];
                popupData.intervals = data[1];
                return popupData;
            });
    }

}
