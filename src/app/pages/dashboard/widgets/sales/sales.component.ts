
import { Interval } from './../top/top.models';


import { DashboardSalesService } from './sales.service';
import { Component, OnInit } from '@angular/core';

import { DashboardSalesConfigComponent } from './config/config.component';
import { Observable } from 'rxjs/Observable';
import { StoreService } from 'app/shared/store.service';
import { HermesService } from 'app/shared/hermes.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { environment } from 'environments/environment';
import { MOCK_SUMMERY_SELLS, MOCK_CONSTANTS_INTERVALS, MOCK_SALES_CONFIG } from 'app/mock-api';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
@Component({
    selector: 'chm-dashboard-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class DashboardSalesComponent implements OnInit {

    bsModalRef: BsModalRef;
    sales = [];
    intervals: any;
    selectedIntervals: any;

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private salesService: DashboardSalesService,
        private storeService: StoreService,
        private hermes: HermesService,
        private appDataService: AppDataService,
        private translate: TranslateService) {
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
            this.sales = MOCK_SUMMERY_SELLS;
            this.intervals = MOCK_CONSTANTS_INTERVALS;
            this.selectedIntervals = MOCK_SALES_CONFIG;
            this.isLoading = false;
        } else {

            Observable.forkJoin(
                this.salesService.getSales(),
                this.hermes.getIntervals(),
                this.salesService.getSalesConfig()
            ).subscribe(
                res => {
                    this.sales = res[0];
                    this.intervals = res[1];
                    this.selectedIntervals = res[2];
                },
                err => {
                    console.log(err);
                },
                () => {
                    this.isLoading = false;
                }
            );
        }
    }

    openConfigurationDialog() {
        const dialogData = { intervals: this.intervals, selectedIntervals: this.selectedIntervals };
        this.appDataService.setData({ input: dialogData });
        // https://github.com/valor-software/ngx-bootstrap/issues/2460
        this.bsModalRef = this.modalService.show(DashboardSalesConfigComponent, { backdrop: 'static' });

        (<DashboardSalesConfigComponent>this.bsModalRef.content).onClose.subscribe(result => {
            if (result) {
                const putData = [];
                result.forEach((item, index) => {
                    const key = index === 0 ? 'WIDGET_SELLS_TIPO_INTERVALO_1' : index === 1 ? 'WIDGET_SELLS_TIPO_INTERVALO_2' : 'WIDGET_SELLS_TIPO_INTERVALO_3';
                    putData.push({ 'key': key, 'value': item.id + '' });
                });

                this.salesService.setSalesConfig(putData)
                    .subscribe(
                        res => {
                            this.selectedIntervals = res;
                            this.updateStatus();
                        },
                        err => {
                            console.log(err.message);
                        }
                    );
            }
        });

        // const dialogRef = this.dialog.open(DashboardSalesConfigComponent, { data: dialogData });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('setConfig : ' + JSON.stringify(result));
        //     if (result) {
        //         const putData = [];
        //         result.forEach((item, index) => {
        //             const key = index == 0 ? 'WIDGET_SELLS_TIPO_INTERVALO_1' : index == 1 ? 'WIDGET_SELLS_TIPO_INTERVALO_2' : 'WIDGET_SELLS_TIPO_INTERVALO_3';
        //             putData.push({ 'key': key, 'value': item.id + '' });
        //         });

        //         this.salesService.setSalesConfig(putData)
        //             .subscribe(
        //             res => {
        //                 this.selectedIntervals = res;
        //                 this.snack.open('La configuración se ha guardado con éxito', undefined, { duration: 4000 });
        //                 this.updateStatus();
        //             },
        //             err => {
        //                 this.snack.open(err.message, undefined, { duration: 10000 });
        //             }
        //             );
        //     }
        // });
    }
}
