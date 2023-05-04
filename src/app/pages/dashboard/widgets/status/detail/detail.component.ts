import { Component, Inject, Input, Optional } from '@angular/core';
import { DashboardStatusDetailTableComponent } from './table/table.component';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';


@Component({
    selector: 'chm-dashboard-status-dialog',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DashboardStatusDetailComponent {

    idChannel: number;
    channelName: string;

    data: any;

    constructor(public bsModalRef: BsModalRef, private appDataService: AppDataService) {
        this.data = appDataService.getData();
        console.log('DashboardStatusDetailComponent => ' + JSON.stringify(this.data));

        this.idChannel = this.data.input.channelId;
        this.channelName = this.data.input.channelName;
    }

    // closeMe(){
    //     this.dialogRef.close();
    // }
}
