import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import { MessagesService } from 'app/services/messages.service';

@Component({
    selector: 'app-samples',
    templateUrl: './samples.component.html',
    styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit, OnDestroy {

    info: {} = { 0: 'Vetri' };
    showDashboard = false;

    constructor(
        private storeSrv: StoreService,
        private msgServ: MessagesService,
        private breadServ: BreadcrumbService,
        private translate: TranslateService
    ) {
        storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
    }

    ngOnInit() {

        // setttings the header for the home
        this.breadServ.setCurrent({
            description: 'SamplePage',
            display: true,
            header: 'Samples',
            levels: [
                {
                    icon: 'dashboard',
                    link: ['/'],
                    title: 'Sample'
                }
            ]
        });

        if (this.storeSrv.getSite()) {
            this.showDashboard = true;
        }
    }

    onSiteChanged(id: number) {
        this.showDashboard = true;
    }

    public ngOnDestroy() {
        // removing the header
        this.breadServ.clear();
    }
}
