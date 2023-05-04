
import { Component, OnInit } from '@angular/core';

import { DashboardAnnouncesDetailComponent } from './detail/detail.component';

import { MOCK_ANNOUNCES } from 'app/mock-api';
import { environment } from 'environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { DashboardAnnouncesService } from 'app/pages/dashboard/widgets/announces/announces.service';
import { StoreService } from 'app/shared/store.service';
import { TranslateService } from 'app/services/translate.service';

@Component({
    selector: 'chm-dashboard-announces',
    templateUrl: './announces.component.html',
    styleUrls: ['./announces.component.css']
})
export class DashboardAnnouncesComponent implements OnInit {

    bsModalRef: BsModalRef;
    announces = [];

    isLoading = false;
    data: any;
    constructor(
        private modalService: BsModalService,
        private salesService: DashboardAnnouncesService,
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
            this.announces = MOCK_ANNOUNCES;
            return;
        }

        this.isLoading = true;
        this.salesService.getAnnounces()
            .subscribe(
                res => {
                    this.isLoading = false; 
                    this.announces = res;
                },
                err => {
                    console.log(err);
                }
            );
    }

    openDetailDialog() {
        const dialogData = { Result: 'NYI' };

        this.appDataService.setData({ input: dialogData });
        // https://github.com/valor-software/ngx-bootstrap/issues/2460
        this.bsModalRef = this.modalService.show(DashboardAnnouncesDetailComponent, { backdrop: 'static' });
    }
}
