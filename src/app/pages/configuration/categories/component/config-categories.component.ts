import { MOCK_CHANNELS } from 'app/pages/presets/shared/mock-data';
import { MOCK_CATEGORIES_ECOMMERCE } from 'app/pages/configuration/categories/shared/mock-data';
import { MOCK_CATEGORIES_CHANNEL } from 'app/pages/configuration/categories/shared/mock-data';
import { MOCK_CATEGORIES_MAP } from 'app/pages/configuration/categories/shared/mock-data';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ConfigCategoriesService } from 'app/pages/configuration/categories/shared/config-categories.service';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { StoreService } from 'app/shared/store.service';
import { Data } from 'app/pages/configuration/categories/shared/data';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import {AccordionModule} from "ng2-accordion";

@Component({
  selector: 'chm-config-categories',
  templateUrl: './config-categories.component.html',
  styleUrls: ['./config-categories.component.css']
})
export class ConfigCategoriesComponent implements OnInit {

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  columns = [];
  isLoading = true;

  isLoadingCategoriasCanal = false;
  isLoadingCategoriasHermes = false;
  isLoadingMapeos = false;

  idSite = null;
  idChannel = null;
  hasSecondaryCategories = false;
  private listChannels: any[] = [];
  private listParentEcommerceCategories: any[] = [];
  private fListParentEcommerceCategories: any[] = [];
  private mapEcommerceCategories = new Map();
  private listParentChannelCategories: any[] = [];
  private fListParentChannelCategories: any[] = [];
  private mapChannelCategories = new Map();
  private listMappedCategories: any[] = [];
  private listMappedCategoriesAux: any[] = [];
  // flags ejecución
  private flagExecSiteChannels = 0;

  constructor(
    private storeSrv: StoreService,
    private configCategoriesService: ConfigCategoriesService,
    private modelosService: PresetsService,
    private router: Router,
    private data: Data,
    private renderer: Renderer2,
    private breadServ: BreadcrumbService,
    private translate: TranslateService) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {

    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.CONFIG_CATEGORIES',

    });
    console.log('Lanzando ngOnInit configuración de categorias');

    if (this.storeSrv.getSite()) {
      this.idSite = this.storeSrv.getSite().id;
      this.getSiteChannels(this.idSite);
    }
  }

  onSiteChanged(id: number) {
    console.log("Lanzando onSiteChanged --> " + id);
    this.isLoading = true;
    // Obtain channels for the site changed
    this.getSiteChannels(id);
  }

  // Get channels of the current site
  getSiteChannels(idSite: number) {
    console.log("Lanzando getChannels para el site " + idSite);
    if (this.flagExecSiteChannels == 0) {
      this.flagExecSiteChannels = 1;
      this.listChannels.length = 0;

      if (environment.mock) {
        this.listChannels = MOCK_CHANNELS;
        this.isLoading = false;
      } else {
        this.modelosService.getChannels().subscribe(
          (data) => {
            for (let key in data) {
              this.listChannels.push(data[key]);
            }
            this.idChannel = this.listChannels[0].channelId;
            this.hasSecondaryCategories = false;
            if(this.listChannels[0].hasSecondaryCategories) {
                this.hasSecondaryCategories = this.listChannels[0].hasSecondaryCategories;
            }
          },
          (error) => console.log("[ERROR] getSiteChannels : " + error)
        );
        this.isLoading = false;
      }
      this.flagExecSiteChannels = 0;
    }

  }


  getCategoriesData(idChannel: number, hasSecondaryCategories: boolean) {

    this.idChannel = idChannel;
    this.hasSecondaryCategories = false;
    if(hasSecondaryCategories) {
        this.hasSecondaryCategories = hasSecondaryCategories;
    }
  }

}
