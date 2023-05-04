import { Component, OnInit } from '@angular/core';
import { General } from 'app/pages/publications/publications-form/data/formData.model';
import { Router } from '@angular/router';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { environment } from 'environments/environment';
import { MOCK_CHANNELS } from '../../shared/mock-data';
import { StoreService } from 'app/shared/store.service';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from 'app/services/translate.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  general: General;
  form: any;

  channels = [];
  isLoading = true;

  bsModalRef: BsModalRef;
  priorities: any[];
  selectedPriority;

  constructor(
    private storeSrv: StoreService
    , private publicationsService: PublicationsService
    , private router: Router
    , private formDataService: FormDataService
    , private modalService: BsModalService
    , private translate: TranslateService) {
  }

  ngOnInit() {
    this.general = this.formDataService.getGeneral();
    this.selectedPriority = this.formDataService.getGeneral().priority;
    console.log('General form loaded!');
    // this.general.channel = null;
    console.log('publicacionModel => ' + JSON.stringify(this.formDataService.publicacionModel));

    if (this.formDataService.viewCacheData.general_channels) {
      console.log('Load Data From viewCache');
      this.channels = this.formDataService.viewCacheData.general_channels;
      this.isLoading = false;
    } else if (environment.mock) {
      this.channels = MOCK_CHANNELS;
      this.formDataService.viewCacheData.general_channels = MOCK_CHANNELS;
      this.isLoading = false;
    } else {
      this.publicationsService.getChannels().subscribe(data => {
        this.channels = data;
        this.isLoading = false;
        this.formDataService.viewCacheData.general_channels = data;
      });
    }

    if (this.formDataService.testing) {
      this.general = {
        'name': '1',
        'description': '2',
        'priority': 1.5,
        'channel': {
          'channelId': 2,
          'name': 'Modalia',
          'idSiteCanal': 1000
        },
        'startDate': '2018-02-05',
        'finishDate': '2018-02-05'
      };
    }

    if (this.formDataService.publicacionModel['publicationId']) {
      console.log('General Form Edit Mode => ' + this.formDataService.publicacionModel['publicationId']);
      this.general['name'] = this.formDataService.publicacionModel['name'];
      this.general['description'] = this.formDataService.publicacionModel['description'];
      this.general['priority'] = this.formDataService.publicacionModel['priority'];
      this.general['channel'] = this.formDataService.publicacionModel['channel'];
      if (this.formDataService.publicacionModel['startDate']) {
        const tStartDate = new Date(this.formDataService.publicacionModel['startDate']);
        this.general['startDate'] = tStartDate.getFullYear().toString() + '-' + (tStartDate.getMonth() + 1).toString() + '-' + tStartDate.getDate().toString() + " " + tStartDate.getHours().toString() + ":" + tStartDate.getMinutes().toString();
      } else {
        this.general['startDate'] = '';
      }
      if (this.formDataService.publicacionModel['finishDate']) {
        const tFinishDate = new Date(this.formDataService.publicacionModel['finishDate']);
        this.general['finishDate'] = tFinishDate.getFullYear().toString() + '-' + (tFinishDate.getMonth() + 1).toString() + '-' + tFinishDate.getDate().toString() + " " + tFinishDate.getHours().toString() + ":" + tFinishDate.getMinutes().toString();
      } else {
        this.general['finishDate'] = '';
      }
    }
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }

    this.formDataService.setGeneral(this.general);
    return true;
  }

  goToNext(form: any) {
    this.isLoading = true;
    this.validatePriority(form);
  }


  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.idSiteCanal === c2.idSiteCanal : c1 === c2;
  }

  isEditForm() {
    return this.formDataService.publicacionModel['publicationId'] ? true : false;
  }

  getStartDate() {
    return new Date(this.general.startDate);
  }

  cancel() {
    let dialogTitle = 'Dialog Title'
      , dialogMsg = 'Dialog Message';

    this.translate.getTranslate().get(['PUBLICATION_CANCEL_DIALOG.DIALOG_TITLE', 'PUBLICATION_CANCEL_DIALOG.DIALOG_MSG']).subscribe(
      translation => {
        console.log(translation);
        dialogTitle = translation['PUBLICATION_CANCEL_DIALOG.DIALOG_TITLE'];
        dialogMsg = translation['PUBLICATION_CANCEL_DIALOG.DIALOG_MSG'];
      });
    const initialState = { title: dialogTitle, msg: dialogMsg };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { initialState });


    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      if (result.status === 'ok') {
        this.router.navigate(['/dashboard']);
      } else if (result.status === "cancel") {
        //do nothing
      }
    });
  }



  validatePriority(form) {
    let idSiteChannel;
    if (this.general.channel.idSiteCanal) {
      idSiteChannel = this.general.channel.idSiteCanal;
    }

    var isDuplicatedPriority = false;
    this.selectedPriority = this.general.priority;
    if (this.selectedPriority % 1 == 0) {
      this.selectedPriority = this.selectedPriority.toFixed(1);
    }
    
    //Si estamos editando, llamamos un WS diferente que excluye la publicacion
    if (this.formDataService.publicacionModel['publicationId']) {
      console.log('General Form Edit Mode => ' + this.formDataService.publicacionModel['publicationId']);

      let idPublicacion = this.formDataService.publicacionModel['publicationId']
      forkJoin(
        this.publicationsService.getPrioritiesByChannelSiteExcludingPublication(idSiteChannel, idPublicacion)
      ).subscribe(
        res => {
          this.priorities = res[0];
          isDuplicatedPriority = this.findCurrentPriorityInResult();
        },
        err => {
          console.log(err);
        },
        () => {
          this.isLoading = false;
          if (!isDuplicatedPriority) {
            //if (this.save(form)) { revisar esta validacion
            this.formDataService.setGeneral(this.general);
            this.router.navigate(['/publications/form/products']);
            //}
          } else {
            this.translationsAndModal('COMMON_WORDS.INFORMATION_TITLE', 'PUBLICATION.DUPLICATED_PRIORITY', '');
          }
        }
      );

    } else {
      forkJoin(
        this.publicationsService.getPrioritiesByChannelSite(idSiteChannel)
      ).subscribe(
        res => {
          this.priorities = res[0];
          isDuplicatedPriority = this.findCurrentPriorityInResult();
        },
        err => {
          console.log(err);
        },
        () => {
          this.isLoading = false;
          if (!isDuplicatedPriority) {
            //if (this.save(form)) { revisar esta validacion
            this.formDataService.setGeneral(this.general);
            this.router.navigate(['/publications/form/products']);
            //}
          } else {
            this.translationsAndModal('COMMON_WORDS.INFORMATION_TITLE', 'PUBLICATION.DUPLICATED_PRIORITY', '');
          }
        }
      );

    }


  }


  findCurrentPriorityInResult() {
    return this.priorities.includes(Math.floor(this.selectedPriority));
  }

  translationsAndModal(dialogTitle, dialogMsg, optional) {
    this.translate.getTranslate().get([dialogTitle, dialogMsg]).subscribe(
      translation => {
        dialogTitle = translation[dialogTitle];
        dialogMsg = translation[dialogMsg];
        this.showAlert(dialogTitle, dialogMsg + optional);
      });
  }

  showAlert(title: string, msg: string) {
    const initialState = {
      title: title
      , msg: msg
    };
    this.modalService.show(AlertDialogComponent, { initialState });
  }

}
