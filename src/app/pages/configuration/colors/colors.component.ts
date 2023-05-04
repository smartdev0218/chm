import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { AppDataService } from 'app/shared/app-data.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import { ColorsService } from 'app/pages/configuration/colors/shared/colors.service';
import { environment } from 'environments/environment';
import { MOCK_CHANNELS, MOCK_HERMES_COLORS, MOCK_CHANNEL_COLORS, MOCK_CHANNEL_MAPPING_COLORS } from 'app/pages/configuration/colors/shared/mock-data';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';

@Component({
  selector: 'chm-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit, OnDestroy {

  channels = [];
  hermesColors = [];
  channelColors = [];
  channelMappingColors = [];

  hermesColorsWithStatus = [];
  channelColorsWithChildrens = [];
  activeChannel: any;

  allHermesColorsWithStatus = [];
  allChannelColorsWithChildrens = [];

  isTabLoading = true;
  isLoading = true;
  totalCount = 0;
  mappedCount = 0;
  selectedChannel;

  constructor(private storeSrv: StoreService, private colorsService: ColorsService
    , private appDataService: AppDataService
    , private breadServ: BreadcrumbService
    , private modalService: BsModalService
    , private translate: TranslateService) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {
    this.breadServ.setCurrent({
      description: 'HEADER.COLOR_DESC',
      display: true,
      header: 'HEADER.COLORS',
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
      this.hermesColors = MOCK_HERMES_COLORS;
      this.channelColors = MOCK_CHANNEL_COLORS;
      this.channelMappingColors = MOCK_CHANNEL_MAPPING_COLORS;
      setTimeout(() => {
        this.isTabLoading = false;
        this.isLoading = false;
      }, 1000);
      if (this.channels.length) {
        this.getChannelData(this.channels[0]);
      }
      this.totalCount = this.hermesColors.length;
      this.mappedCount = this.channelMappingColors.length;
    } else {

      Observable.forkJoin(
        this.colorsService.getAllChannels(),
        this.colorsService.getHermesColors(),
      ).subscribe(
        res => {
          this.channels = res[0];
          this.hermesColors = res[1];
          this.totalCount = this.hermesColors.length;
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
      this.channelColors = MOCK_CHANNEL_COLORS;
      this.channelMappingColors = MOCK_CHANNEL_MAPPING_COLORS;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      this.updateViewData();
    } else {

      Observable.forkJoin(
        this.colorsService.getColorsByChannel(idChannel),
        this.colorsService.getMappingColorsByChannel(idChannel)
      ).subscribe(
        res => {
          this.channelColors = res[0];
          this.channelMappingColors = res[1];
          this.mappedCount = this.channelMappingColors.length;
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

    this.hermesColorsWithStatus = [];
    this.channelColorsWithChildrens = [];

    this.hermesColors.forEach((hermesColor) => {
      const tItem = this.channelMappingColors.find(i => i.idColorHermes === hermesColor.colorId);
      console.log('tItem => ' + JSON.stringify(tItem));
      hermesColor['isMapped'] = tItem ? true : false;
      this.hermesColorsWithStatus.push(hermesColor);
    });

    this.channelColors.forEach((channelColor) => {
      const tItems = [];
      this.channelMappingColors.forEach((channelMappingColor) => {
        if (channelColor.channelColorId === channelMappingColor.idColorChannel) {
          const t = this.hermesColors.find(i => i.colorId === channelMappingColor.idColorHermes);
          if (t) {
            tItems.push(t);
          }
        }
      });

      channelColor['children'] = tItems;
      this.channelColorsWithChildrens.push(channelColor);
    });

    this.allHermesColorsWithStatus = this.hermesColorsWithStatus;
    this.allChannelColorsWithChildrens = this.channelColorsWithChildrens;

    console.log('hermesColorsWithStatus => ' + JSON.stringify(this.hermesColorsWithStatus));
    console.log('channelColorsWithChildrens => ' + JSON.stringify(this.channelColorsWithChildrens));
  }

  filterHermesColors(evt) {
    const type = evt.target.value;
    console.log('filterHermesColors => ' + type);

    const tHermesColorsWithStatus = [];
    this.allHermesColorsWithStatus.forEach((hermesColor) => {
      if (type === 'all') {
        tHermesColorsWithStatus.push(hermesColor);
      } else if (type === 'Mapped' && hermesColor.isMapped) {
        tHermesColorsWithStatus.push(hermesColor);
      } else if (type === 'Not Mapped' && !hermesColor.isMapped) {
        tHermesColorsWithStatus.push(hermesColor);
      }
    });

    this.hermesColorsWithStatus = tHermesColorsWithStatus;
  }

  filterChannelColors(evt) {
    const type = evt.target.value;
    console.log('filterChannelColors => ' + type);

    const tChannelColorsWithChildrens = [];
    this.allChannelColorsWithChildrens.forEach((channelColor) => {
      if (type === 'all') {
        tChannelColorsWithChildrens.push(channelColor);
      } else if (type === 'Mapped' && channelColor.children.length) {
        tChannelColorsWithChildrens.push(channelColor);
      } else if (type === 'Not Mapped' && !channelColor.children.length) {
        tChannelColorsWithChildrens.push(channelColor);
      }
    });

    this.channelColorsWithChildrens = tChannelColorsWithChildrens;
  }

  addMapping($event: any, channelColor: any) {
    const hermesColor = $event.dragData;
    console.log('hermesColor => ' + JSON.stringify(hermesColor));
    console.log('channelColor => ' + JSON.stringify(channelColor));
    this.isLoading = true;

    console.log('addMapping => ' + this.activeChannel.channelId + ' ' + hermesColor.colorId + ' ' + channelColor.channelColorId);

    if (environment.mock) {
      hermesColor.isMapped = true;
      channelColor.children.push(hermesColor);
      this.isLoading = false;
    } else {
      this.colorsService.addColorMapping(
        this.activeChannel.channelId, hermesColor.colorId, channelColor.channelColorId
      ).subscribe(data => {
        console.log('addColorMapping res => ' + JSON.stringify(data));
        hermesColor.isMapped = true;
        channelColor.children.push(hermesColor);
        this.mappedCount = this.mappedCount + 1;
        this.isLoading = false;
      });
    }
  }

  removeMapping(channelColor: any, hermesColor: any) {
    // idChannel, idHermesColor, idChannelColor
    console.log('hermesColor => ' + JSON.stringify(hermesColor));
    console.log('channelColor => ' + JSON.stringify(channelColor));
    this.isLoading = true;

    console.log('removeMapping => ' + this.activeChannel.channelId + ' ' + hermesColor.colorId + ' ' + channelColor.channelColorId);

    if (environment.mock) {
      hermesColor.isMapped = false;
      const index = channelColor.children.indexOf(hermesColor);
      channelColor.children.splice(index, 1);
    } else {
      this.colorsService.deleteColorMapping(
        this.activeChannel.channelId, hermesColor.colorId, channelColor.channelColorId
      ).subscribe(data => {
        console.log('removeMapping res => ' + JSON.stringify(data));
        hermesColor.isMapped = false;
        const index = channelColor.children.indexOf(hermesColor);
        this.mappedCount = this.mappedCount - 1;
        channelColor.children.splice(index, 1);
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
