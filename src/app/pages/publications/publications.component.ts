import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { TranslateService } from 'app/services/translate.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, OnDestroy {

  showDashboard = false;

  constructor(private storeSrv: StoreService, private breadServ: BreadcrumbService
    , private publicationsService: PublicationsService
    , private formDataService: FormDataService
    , private translate: TranslateService
  ) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {
    console.log('PublicationsComponent.Init');
    // reset Form cahce data
    this.formDataService.resetFormData();
    // this.publicationsService.getProductBrands().subscribe(data => console.log(data));

    // setttings the header for the home
    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.PUBLICATIONS',
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
