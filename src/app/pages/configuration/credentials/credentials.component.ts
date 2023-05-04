import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Renderer2 } from '@angular/core';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import { CredentialsService } from 'app/pages/configuration/credentials/shared/credentials.service';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  isTabLoading = true;
  isLoading = true;
  showCredentials = false;

  channels = [];
  fields = [];
  credentials = [];

  deshabilitado: boolean = false;

  activeChannel: any;
  idSite: number;

  constructor(
    private storeSrv: StoreService,
    private credentialsService: CredentialsService,
    private router: Router,
    private renderer: Renderer2,
    private breadServ: BreadcrumbService,
    private translate: TranslateService,
    private modalService: BsModalService) {

    this.idSite = this.storeSrv.getSite().id;
  }

  ngOnInit() {
    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.CONFIG_CREDENTIALS',
    });
    //Carga los canales del site al iniciar
    this.updateView();
  }

  onSiteChanged(id: number) {
    this.isLoading = true;
    this.updateView();
  }

  updateView() {
    Observable.forkJoin(
      this.credentialsService.getChannelsBySite(this.idSite)
    ).subscribe(
      res => {
        this.channels = res[0];
        if (this.channels.length) {
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

  getChannelData(channel) {
    this.showCredentials = false;
    this.deshabilitado = true;
    this.activeChannel = channel;
    const idChannel = channel.channelId;
    const idSiteChannel = channel.idSiteCanal;
    this.isLoading = true;
    this.fields = [];

    /*Pedimos los campos primero*/
    Observable.forkJoin(
      this.credentialsService.getCredentialsFieldsByChannel(idChannel),
      this.credentialsService.getCredentialsBySiteAndChannel(this.idSite, idChannel,idSiteChannel),
    ).subscribe(
      res => {
        this.fields = res[0];
        let credentials = res[1];
        for(let i=0; i<this.fields.length; i++) {
          this.fields[i].value = '';
          for(let j=0; j<credentials.length; j++) {
            if(credentials[j].key == this.fields[i].key) {
              this.fields[i].value = credentials[j].value;
            }
          }
        }
        this.fields.sort(function(a,b) {
          return a.name.localeCompare(b.name);
        });
      },
      err => {
        console.log(err);
        this.translationsAndModal('CREDENTIALS.INFORMATION_TITLE', 'CREDENTIALS.ERR_MESSAGE', err);
      },
      () => {

        this.deshabilitado = false;
        this.isLoading = false;

      }
    );
  }

  postCredentials() {
    this.isLoading = true;
    let credentials = [];
    for(let i=0 ; i<this.fields.length; i++ ){
      let credential = {idSite: this.idSite, key:this.fields[i].key, idCanal:this.activeChannel.channelId, value:this.fields[i].value, idSiteCanal: this.activeChannel.idSiteCanal};
      credentials.push(credential);
    }
    Observable.forkJoin(
      this.credentialsService.setCredentialsBySiteAndChannel(this.idSite, this.activeChannel.channelId, this.activeChannel.idSiteCanal, credentials)
    ).subscribe(
      res => {
      },
      err => {
        console.log(err);
        this.translationsAndModal('CREDENTIALS.INFORMATION_TITLE', 'CREDENTIALS.ERR_MESSAGE', err);
        this.isLoading = false;
      },
      () => {
        this.translationsAndModal('CREDENTIALS.INFORMATION_TITLE', 'CREDENTIALS.SUCCESS_OPERATION', '');
        this.isLoading = false;
      }
    );
  }

  toggleCredentials() {
    this.showCredentials = !this.showCredentials;
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
