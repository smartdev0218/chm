import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DashboardStatusDetailComponent } from './detail/detail.component';
import { DashboardStatusService } from './status.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { MOCK_CHANNELS_STATUS } from 'app/mock-api';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
import { HermesService } from 'app/shared/hermes.service';
import { DashboardStatusAuthorizationComponent } from './authorization/authorization.component';

@Component({
    selector: 'chm-dashboard-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class DashboardStatusComponent implements OnInit {

    bsModalRef: BsModalRef;
    channels = [];

    isLoading = false;
    refreshTime: number = Date.now();

    currency = "€";
    userLanguage;

    constructor(
        private modalService: BsModalService,
        private statusService: DashboardStatusService,
        private storeService: StoreService,
        private appDataService: AppDataService,
        private translate: TranslateService,
        private hermesSrv: HermesService) {
        storeService.siteChanged$.subscribe(() => this.onSiteChanged());
    }

    ngOnInit() {
        this.getCurrency();
        this.updateStatus();
    }

    onSiteChanged() {
        this.updateStatus();
    }

    updateStatus() {

        this.refreshTime = Date.now();
        if (environment.mock) {
            this.channels = MOCK_CHANNELS_STATUS;
            return;
        }

        this.isLoading = true;
        this.statusService.getChannels()
            .subscribe(
                res => {
                    this.isLoading = false;
                    this.channels = res;
                },
                err => {
                    console.log(err);
                }
            );
    }

    openDetailDialog(channel) {
        if (!!channel.needsAuthorization) {
            this.appDataService.setData({ input: channel });
            this.bsModalRef = this.modalService.show(DashboardStatusAuthorizationComponent, {
                backdrop: 'static',
                class: 'modal-lg modal-lg-bs'
            });
        } else if (channel.statusName != 'OK') {
            const initialState = {
                list: [
                    'Open a modal with component',
                    'Pass your data',
                    'Do something else',
                    '...'
                ],
                title: 'Modal with component'
            };

            this.appDataService.setData({ input: channel });
            this.bsModalRef = this.modalService.show(DashboardStatusDetailComponent, { initialState, backdrop: 'static' });
            this.bsModalRef.content.idChannel = channel.idChannel;
            this.bsModalRef.content.channelName = channel.channelName;
        }
    }

    getCurrency() {
        Observable.forkJoin(
            this.hermesSrv.getLang()
        ).subscribe(
            res => {
                this.userLanguage = res[0];
            },
            err => {
                console.log(err);
            },
            () => {
                if (this.userLanguage == "PT") {
                    this.currency = "R$";
                } else {
                    this.currency = "€";
                }
            }
        );
    }
}
