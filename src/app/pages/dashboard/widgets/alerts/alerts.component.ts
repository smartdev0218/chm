
import { Component, OnInit } from '@angular/core';

import { Alert } from './alert';
import { DashboardAlertsDetailComponent } from './detail/detail.component';
import { DashboardAlertsConfigComponent } from './config/config.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DashboardAlertsService } from 'app/pages/dashboard/widgets/alerts/alerts.service';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { MOCK_ALERTS } from 'app/mock-api';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
@Component({
    selector: 'chm-dashboard-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})
export class DashboardAlertsComponent implements OnInit {

    bsModalRef: BsModalRef;
    alerts = [];

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private alertsService: DashboardAlertsService,
        private storeService: StoreService,
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

        if (environment.mock) {
            this.alerts = MOCK_ALERTS;
            return;
        }

        this.isLoading = true;
        this.alertsService.getAlerts()
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.alerts = res;
                    this.formatAlerts();
                },
                err => {
                    console.log(err);
                }
            );
    }

    openConfigurationDialog() {
        const dialogData = { Result: 'NYI' };

        this.appDataService.setData({ input: dialogData });
        // https://github.com/valor-software/ngx-bootstrap/issues/2460
        this.bsModalRef = this.modalService.show(DashboardAlertsConfigComponent, { backdrop: 'static' });
    }

    openDetailDialog() {
        const dialogData = { Result: 'NYI' };

        this.appDataService.setData({ input: dialogData });
        // https://github.com/valor-software/ngx-bootstrap/issues/2460
        this.bsModalRef = this.modalService.show(DashboardAlertsDetailComponent, { backdrop: 'static' });
    }

    formatAlerts(){
        /*Formateando fechas */
        this.alerts.forEach(alert => {
            alert.date = new Date (alert.date);
        });        
        /*Ordenando las alertas que tienen error*/ 
         this.alerts.sort((a, b) => {
            if (a.error) {
               return -1;
            }
            if (b.error) {
               return 1;
            }
            return 0;
         });
    }
}
