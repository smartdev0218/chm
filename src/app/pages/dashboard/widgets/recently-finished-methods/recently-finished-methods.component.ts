import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'app/shared/store.service';
import { DashboardRecentlyFinishedMethodsService } from 'app/pages/dashboard/widgets/recently-finished-methods/recently-finished-methods.service';
import { AppDataService } from 'app/shared/app-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { environment } from 'environments/environment';
import { MOCK_PUBLICATIONS } from 'app/pages/publications/shared/mock-data';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { TranslateService } from 'app/services/translate.service';

@Component({
    selector: 'chm-dashboard-recently-finished-methods',
    templateUrl: './recently-finished-methods.component.html',
    styleUrls: ['./recently-finished-methods.component.css']
})
export class DashboardRecentlyFinishedMethodsComponent implements OnInit {

    bsModalRef: BsModalRef;
    recentlyFinishedMethods: any[] = [];

    isLoading = false;

    constructor(
        private modalService: BsModalService,
        private recentlyFinishedMethodsService: DashboardRecentlyFinishedMethodsService,
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
            this.recentlyFinishedMethods = [];
            return;
        }

        this.isLoading = true;
        this.recentlyFinishedMethodsService.getRecentlyFinishedMethods(this.storeService.getSite().id)
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.recentlyFinishedMethods = res;
                },
                err => {
                    console.log(err);
                }
            );
    }

}
