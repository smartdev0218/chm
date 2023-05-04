import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { AppDataService } from 'app/shared/app-data.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import { MethodsService } from 'app/pages/configuration/methods/shared/methods.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { environment } from 'environments/environment';
import { MOCK_CHANNELS, MOCK_METHODS } from 'app/pages/configuration/methods/shared/mock-data';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { MethodFormComponent } from 'app/pages/configuration/methods/method-form/method-form.component';

@Component({
  selector: 'chm-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css']
})
export class MethodsComponent implements OnInit, OnDestroy {

  isTabLoading = true;
  isLoading = true;

  channels = [];
  activeChannel: any;

  channelMethods = [];
  methods = [];

  selectedChannel;

  bsModalRef: BsModalRef;

  constructor(private storeSrv: StoreService, private methodsService: MethodsService
    , private appDataService: AppDataService
    , private modalService: BsModalService
    , private breadServ: BreadcrumbService
    , private translate: TranslateService) { }

  ngOnInit() {
    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.METHODS',
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
      setTimeout(() => {
        this.isTabLoading = false;
        this.isLoading = false;
      }, 1000);
      if (this.channels.length) {
        this.selectedChannel = this.channels[0];
        this.getChannelData(this.channels[0]);
      }
    } else {

      Observable.forkJoin(
        this.methodsService.getAllChannels()
      ).subscribe(
        res => {
          this.channels = res[0];
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

  // getChannelData(channel) {
  //   this.activeChannel = channel;
  //   this.isLoading = true;

  //   console.log('getChannelData => ' + JSON.stringify(channel));
  //   const idChannel = channel.channelId;
  //   if (environment.mock) {
  //     this.channelMethods = MOCK_METHODS;
  //     setTimeout(() => {
  //       this.isLoading = false;
  //     }, 1000);
  //   } else {

  //     Observable.forkJoin(
  //       this.methodsService.getMethods(),
  //     ).subscribe(
  //       res => {
  //         this.channelMethods = res[0];
  //       },
  //       err => {
  //         console.log(err);
  //       },
  //       () => {
  //         this.isLoading = false;
  //       }
  //     );
  //   }
  // }

  getChannelData(channel) {
    this.activeChannel = channel;
    const idChannel = channel.channelId;
    this.isLoading = true;
    Observable.forkJoin(
      this.methodsService.getMethods(),
    ).subscribe(
      res => {
        this.methods = res[0];
      },
      err => {
        console.log(err);
      },
      () => {
         let data1 = [];
         for(let method of this.methods){
          if (method.channel.channelId == channel.channelId){
           data1.push(method);
          }
         }
         this.channelMethods = data1;
         this.isLoading = false;
      }
    );

  }


  methodActivate(methodModel) {
    console.log("methodModel methodModel ===> " + JSON.stringify(methodModel))
    let dialogTitle = 'Dialog Title'
      , dialogMsg = 'Dialog Message';
    this.translate.getTranslate().get(['METHODS.FUNC_DIALOG_TITLE', 'METHODS.FUNC_DIALOG_MSG']).subscribe(
      translation => {
        console.log(translation);
        dialogTitle = translation['METHODS.FUNC_DIALOG_TITLE'];
        dialogMsg = translation['METHODS.FUNC_DIALOG_MSG'];
      });

    const initialState = { title: dialogTitle, msg: dialogMsg };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { initialState });

    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('Result : ' + JSON.stringify(result));
      if (result.status === 'ok') {
        const index = this.channelMethods.indexOf(methodModel);
        let result_data;
          const modelValue = { methodId: 0, active: false, channel: this.activeChannel, name: '', commandPublication: '', commandSite: '', periodHours: 0, periodMinutes: 0 };
          modelValue.methodId = methodModel.methodId;
          modelValue.active = (methodModel.active == true) ?  false : true ;
          modelValue.channel = methodModel.channel;
          modelValue.name = methodModel.name;
          modelValue.commandPublication = methodModel.commandPublication;
          modelValue.commandSite = methodModel.commandPublication;
          modelValue.periodHours = methodModel.periodHours;
          modelValue.periodMinutes = methodModel.periodMinutes;

          console.log("modelValue ==>  "+JSON.stringify(modelValue));
          if (modelValue.methodId) {
            result_data = this.methodsService.updateMethod(modelValue).subscribe(data => {
              this.getChannelData(this.activeChannel);
            });
          } else {
            result = this.methodsService.addMethod(modelValue).subscribe(data => {
              this.getChannelData(this.activeChannel);
            });
          }

      }
    });
  }



  deleteMethod(methodModel) {

    // Fetch Dialog Labels from i18n
    let dialogTitle = 'Dialog Title'
      , dialogMsg = 'Dialog Message';
    this.translate.getTranslate().get(['METHODS.DIALOG_TITLE', 'METHODS.DIALOG_MSG']).subscribe(
      translation => {
        console.log(translation);
        dialogTitle = translation['METHODS.DIALOG_TITLE'];
        dialogMsg = translation['METHODS.DIALOG_MSG'];
      });

    const initialState = { title: dialogTitle, msg: dialogMsg };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { initialState });

    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('Result : ' + JSON.stringify(result));
      if (result.status === 'ok') {
        const index = this.channelMethods.indexOf(methodModel);
        this.channelMethods.splice(index, 1);

        this.methodsService.deleteMethod(methodModel.methodId)
          .subscribe(null,
            err => {
              this.showAlert('METHOD_ALERT.TITLE', 'METHOD_ALERT.MESSAGE');
              // Revert the view back to its original state
              this.channelMethods.splice(index, 0, methodModel);
            });
      }
    });
  }

  goEditForm(model) {

    this.appDataService.setData({ mode: 'edit', input: model, activeChannel: this.activeChannel });
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(MethodFormComponent, { backdrop: 'static' });

    (<MethodFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.getChannelData(this.activeChannel);
      }
    });
  }

  goViewForm(model) {

    this.appDataService.setData({ mode: 'view', input: model, activeChannel: this.activeChannel });
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(MethodFormComponent, { backdrop: 'static' });

    (<MethodFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.getChannelData(this.activeChannel);
      }
    });
  }

  goCreateForm() {
    this.appDataService.setData({ mode: 'new', activeChannel: this.activeChannel });
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(MethodFormComponent, { backdrop: 'static' });

    (<MethodFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.getChannelData(this.activeChannel);
      }
    });
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
