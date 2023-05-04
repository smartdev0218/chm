import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { environment } from 'environments/environment';
import { MOCK_MODELS } from 'app/pages/presets/shared/mock-data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { PresetsFormComponent } from 'app/pages/presets/presets-form/presets-form.component';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { TranslateService } from 'app/services/translate.service';

@Component({
  selector: 'chm-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef;

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  columns = [];
  isLoading = true;

  private models: any[] = [];

  constructor(private storeSrv: StoreService, private presetsService: PresetsService
    , private appDataService: AppDataService
    , private modalService: BsModalService
    , private breadServ: BreadcrumbService
    , private translate: TranslateService) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {

    // setttings the header for the home
    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.PRESETS',
    });

    if (this.storeSrv.getSite()) {
      this.isLoading = true;
    }

    this.setColumns();
    this.updateStatus();
  }

  onSiteChanged(id: number) {
    this.isLoading = true;
    // this.updateStatus();
  }

  updateStatus() {
    console.log('updateStatus => ' + this.isLoading);
    if (environment.mock) {
      this.models = MOCK_MODELS;
      this.isLoading = false;
    } else {
      this.presetsService.getModels().subscribe(data => {
        this.models = data;
        this.isLoading = false;
      });
    }

  }

  deleteModel(model) {
    // Fetch Dialog Labels from i18n
    let dialogTitle = 'Dialog Title'
      , dialogMsg = 'Dialog Message';
    this.translate.getTranslate().get(['PRESETS.DIALOG_TITLE', 'PRESETS.DIALOG_MSG']).subscribe(
      translation => {
        console.log(translation);
        dialogTitle = translation['PRESETS.DIALOG_TITLE'];
        dialogMsg = translation['PRESETS.DIALOG_MSG'];
      });

    const initialState = { title: dialogTitle, msg: dialogMsg };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { initialState });

    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('Result : ' + JSON.stringify(result));
      if (result.status === 'ok') {
        const index = this.models.indexOf(model);
        this.models.splice(index, 1);

        this.presetsService.deleteModel(model.modelId)
          .subscribe(null,
            err => {
              this.showAlert('PRESET_ALERT.TITLE', 'PRESET_ALERT.MESSAGE');
              // Revert the view back to its original state
              this.models.splice(index, 0, model);
            });
      }
    });
  }

  goEditForm(model) {

    this.appDataService.setData({ input: model });
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(PresetsFormComponent, { backdrop: 'static' });

    (<PresetsFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.updateStatus();
      }
    });
  }

  goCreateForm() {
    this.appDataService.setData({});
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(PresetsFormComponent, { backdrop: 'static' });

    (<PresetsFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.updateStatus();
      }
    });
  }

  private setColumns() {
    this.columns = [
      {
        name: 'Preset Name',
        prop: 'modelName',
        draggable: false,
        flexGrow: 2
      },
      {
        name: 'Channel',
        prop: 'channelName',
        draggable: false,
        flexGrow: 1
      },
      {
        name: 'Preset Type',
        prop: 'modelTypeName',
        flexGrow: 2
      },
      {
        name: 'Action',
        prop: 'name',
        cellTemplate: this.cellTemplate,
        flexGrow: 1
      }
    ];
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
