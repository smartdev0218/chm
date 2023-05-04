
import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DashboardRunningMethodsService } from 'app/pages/dashboard/widgets/running-methods/running-methods.service';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
@Component({
    selector: 'chm-dashboard-running-methods',
    templateUrl: './running-methods.component.html',
    styleUrls: ['./running-methods.component.css']
})
export class DashboardRunningMethodsComponent implements OnInit {

    bsModalRef: BsModalRef;
    runningMethods = [];

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private runningMethodsService: DashboardRunningMethodsService,
        private storeService: StoreService,
        private appDataService: AppDataService,
        private translate: TranslateService) {
        storeService.siteChanged$.subscribe(id => this.onSiteChanged(id));
    }

    ngOnInit() {
        this.updateMethods();
    }

    onSiteChanged(id: number) {
        this.updateMethods();
    }

    updateMethods() {

        if (environment.mock) {
            this.runningMethods = [];
            return;
        }

        this.isLoading = true;
        this.runningMethodsService.getRunningMethods(this.storeService.getSite().id)
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.runningMethods = res;
                },
                err => {
                    console.log(err);
                }
            );
    }


}
