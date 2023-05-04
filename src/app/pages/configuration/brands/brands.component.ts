import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { AppDataService } from 'app/shared/app-data.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';

import { environment } from 'environments/environment';
import { MOCK_CHANNELS, MOCK_HERMES_BRANDS, MOCK_CHANNEL_BRANDS, MOCK_CHANNEL_MAPPING_BRANDS } from 'app/pages/configuration/brands/shared/mock-data';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { BrandsService } from 'app/pages/configuration/brands/shared/brands.service';

@Component({
  selector: 'chm-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, OnDestroy {

  channels = [];
  hermesBrands = [];
  channelBrands = [];
  channelMappingBrands = [];

  hermesBrandsWithStatus = [];
  channelBrandsWithChildrens = [];
  activeChannel: any;

  allHermesBrandsWithStatus = [];
  allChannelBrandsWithChildrens = [];

  isTabLoading = true;
  isLoading = true;
  totalCount = 0;
  mappedCount = 0;

  selectedChannel;

  constructor(private storeSrv: StoreService, private brandsService: BrandsService
    , private appDataService: AppDataService
    , private breadServ: BreadcrumbService
    , private modalService: BsModalService
    , private translate: TranslateService) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {
    this.breadServ.setCurrent({
      description: 'HEADER.BRAND_DESC',
      display: true,
      header: 'HEADER.BRANDS',
    });

    this.updateView();
  }

  onSiteChanged(id: number) {
    this.isLoading = true;
    this.updateView();
  }

  updateView() {
    console.log('updateView => ' + this.isLoading);
    if (environment.mock) {
      this.channels = MOCK_CHANNELS;
      this.hermesBrands = MOCK_HERMES_BRANDS;
      this.channelBrands = MOCK_CHANNEL_BRANDS;
      this.channelMappingBrands = MOCK_CHANNEL_MAPPING_BRANDS;
      setTimeout(() => {
        this.isTabLoading = false;
        this.isLoading = false;
      }, 1000);

      if (this.channels.length) {
        this.getChannelData(this.channels[0]);
      }
      this.totalCount = this.hermesBrands.length;
      this.mappedCount = this.channelMappingBrands.length;
    } else {

      Observable.forkJoin(
        this.brandsService.getAllChannels(),
        this.brandsService.getHermesBrands(),
      ).subscribe(
        res => {
          this.channels = res[0];
          this.hermesBrands = res[1];
          this.totalCount = this.hermesBrands.length;

          if (this.channels.length) {
            this.selectedChannel = this.channels[0];
            this.getChannelData(this.channels[0]);
          }
        },
        err => {
          console.log(err);
        },
        () => {
          this.isTabLoading = false;
        }
      );

      
    }
  }

  getChannelData(channel) {
    this.activeChannel = channel;
    this.isLoading = true;

    console.log('getChannelData => ' + JSON.stringify(channel));

    const idChannel = channel.channelId;
    if (environment.mock) {
      this.channelBrands = MOCK_CHANNEL_BRANDS;
      this.channelMappingBrands = MOCK_CHANNEL_MAPPING_BRANDS;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      this.updateViewData();
    } else {

      Observable.forkJoin(
        this.brandsService.getBrandsByChannel(idChannel),
        this.brandsService.getMappingBrandsByChannel(idChannel)
      ).subscribe(
        res => {
          this.channelBrands = res[0];
          this.channelMappingBrands = res[1];
          this.mappedCount = this.channelMappingBrands.length;
          this.updateViewData();
        },
        err => {
          console.log(err);
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  updateViewData() {

    this.hermesBrandsWithStatus = [];
    this.channelBrandsWithChildrens = [];

    this.hermesBrands.forEach((hermesBrand) => {
      const tItem = this.channelMappingBrands.find(i => i.idBrandHermes === hermesBrand.brandId);
      console.log('tItem => ' + JSON.stringify(tItem));
      hermesBrand['isMapped'] = tItem ? true : false;
      this.hermesBrandsWithStatus.push(hermesBrand);
    });

    this.channelBrands.forEach((channelBrand) => {
      const tItems = [];
      this.channelMappingBrands.forEach((channelMappingBrand) => {
        if (channelBrand.channelBrandId === channelMappingBrand.idBrandChannel) {
          const t = this.hermesBrands.find(i => i.brandId === channelMappingBrand.idBrandHermes);
          if (t) {
            tItems.push(t);
          }
        }
      });

      channelBrand['children'] = tItems;
      this.channelBrandsWithChildrens.push(channelBrand);
    });

    this.allHermesBrandsWithStatus = this.hermesBrandsWithStatus;
    this.allChannelBrandsWithChildrens = this.channelBrandsWithChildrens;

    console.log('hermesBrandsWithStatus => ' + JSON.stringify(this.hermesBrandsWithStatus));
    console.log('channelBrandsWithChildrens => ' + JSON.stringify(this.channelBrandsWithChildrens));
  }

  filterHermesBrands(evt) {
    const type = evt.target.value;
    console.log('filterHermesBrands => ' + type);

    const tHermesBrandsWithStatus = [];
    this.allHermesBrandsWithStatus.forEach((hermesBrand) => {
      if (type === 'all') {
        tHermesBrandsWithStatus.push(hermesBrand);
      } else if (type === 'Mapped' && hermesBrand.isMapped) {
        tHermesBrandsWithStatus.push(hermesBrand);
      } else if (type === 'Not Mapped' && !hermesBrand.isMapped) {
        tHermesBrandsWithStatus.push(hermesBrand);
      }
    });

    this.hermesBrandsWithStatus = tHermesBrandsWithStatus;
  }

  filterChannelBrands(evt) {
    const type = evt.target.value;
    console.log('filterChannelBrands => ' + type);

    const tChannelBrandsWithChildrens = [];
    this.allChannelBrandsWithChildrens.forEach((channelBrand) => {
      if (type === 'all') {
        tChannelBrandsWithChildrens.push(channelBrand);
      } else if (type === 'Mapped' && channelBrand.children.length) {
        tChannelBrandsWithChildrens.push(channelBrand);
      } else if (type === 'Not Mapped' && !channelBrand.children.length) {
        tChannelBrandsWithChildrens.push(channelBrand);
      }
    });

    this.channelBrandsWithChildrens = tChannelBrandsWithChildrens;
  }

  addMapping($event: any, channelBrand: any) {
    const hermesBrand = $event.dragData;
    console.log('hermesBrand => ' + JSON.stringify(hermesBrand));
    console.log('channelBrand => ' + JSON.stringify(channelBrand));
    this.isLoading = true;

    console.log('addMapping => ' + this.activeChannel.channelId + ' ' + hermesBrand.brandId + ' ' + channelBrand.channelBrandId);

    if (environment.mock) {
      hermesBrand.isMapped = true;
      channelBrand.children.push(hermesBrand);
      this.isLoading = false;
    } else {
      this.brandsService.addBrandMapping(
        this.activeChannel.channelId, hermesBrand.brandId, channelBrand.channelBrandId
      ).subscribe(data => {
        console.log('addBrandMapping res => ' + JSON.stringify(data));
        hermesBrand.isMapped = true;
        channelBrand.children.push(hermesBrand);
        this.mappedCount = this.mappedCount + 1;
        this.isLoading = false;
      });
    }
  }

  removeMapping(channelBrand: any, hermesBrand: any) {
    // idChannel, idHermesBrand, idChannelBrand
    console.log('hermesBrand => ' + JSON.stringify(hermesBrand));
    console.log('channelBrand => ' + JSON.stringify(channelBrand));
    this.isLoading = true;

    console.log('removeMapping => ' + this.activeChannel.channelId + ' ' + hermesBrand.brandId + ' ' + channelBrand.channelBrandId);

    if (environment.mock) {
      hermesBrand.isMapped = false;
      const index = channelBrand.children.indexOf(hermesBrand);
      channelBrand.children.splice(index, 1);
    } else {
      this.brandsService.deleteBrandMapping(
        this.activeChannel.channelId, hermesBrand.brandId, channelBrand.channelBrandId
      ).subscribe(data => {
        console.log('removeMapping res => ' + JSON.stringify(data));
        hermesBrand.isMapped = false;
        const index = channelBrand.children.indexOf(hermesBrand);
        this.mappedCount = this.mappedCount - 1;
        channelBrand.children.splice(index, 1);
        this.isLoading = false;
      });
    }
  }

  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }

  showAlert(title: string, msg: string) {
    const initialState = {
      title: title
      , msg: msg
    };
    this.modalService.show(AlertDialogComponent, { initialState });
  }

}
