import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { ChannelStatus } from '../channel-status';
import { StoreService } from '../../../../../shared/store.service';


@Component({
    selector: 'chm-dashboard-status-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css']
})
export class DashboardStatusAuthorizationComponent {

    channel: ChannelStatus;
    data: any;

    constructor(private bsModalRef: BsModalRef,
                private bsModalService: BsModalService,
                private appDataService: AppDataService,
                private storeService: StoreService) {
        this.data = appDataService.getData();
        console.log('DashboardStatusCredentialsComponent => ' + JSON.stringify(this.data));

        this.channel = this.data.input;
    }

    closeMe() {
        this.bsModalRef.hide();
    }

    goToGetCredentials() {
        window.location.href = this.storeService.getChmUrl() + 'open/mercadoLibre/authToken/' + this.channel.channelSiteId;
    }
}
