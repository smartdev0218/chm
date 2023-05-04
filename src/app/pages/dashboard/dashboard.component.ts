import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import { MenuService } from 'app/services/menu.service';
import {UserService} from 'app/services/user.service'
import { User } from 'app/models/user';
import { PublicationsComponent } from 'app/pages/publications/publications.component';
import { PublicationsListComponent } from 'app/pages/publications/publications-list/publications-list.component';
import { PublicationsRoutingModule, routedComponents } from 'app/pages/publications/publications.routes';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';

@Component({
    selector: 'chm-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    showDashboard = true;
    private mylinks: any = []
    defaultLanguage;

    constructor(private storeSrv: StoreService, private breadServ: BreadcrumbService, private translate: TranslateService,
         private menuServ: MenuService, private userServ: UserService) {
        storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
    }

    ngOnInit() {

        // setttings the header for the home
        this.breadServ.setCurrent({
            description: '',
            display: true,
            header: 'HEADER.DASHBOARD',
          
        });

        if (this.storeSrv.getSite()) {
            this.showDashboard = true;
        }

        this.menuServ.getHtml().subscribe(
            data => {
              this.mylinks = JSON.parse(data.text(), (k, v) => v === "true" ? true : v === "false" ? false : v);
              this.menuServ.setCurrent(this.mylinks)
            },
            error =>{
              console.log(error);
            },
            () =>{
             //continuar
            }
          );

      
        
    }

    onSiteChanged(id: number) {
        this.showDashboard = true;
    }
}
