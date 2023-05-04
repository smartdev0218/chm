import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Renderer2 } from '@angular/core';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';
import { StatementsService } from 'app/pages/statements/shared/statements.service';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit {

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  isTabLoading = true;
  isLoading = true;
  showStatements = false;

  channels = [];
  statements = [];

  deshabilitado: boolean = false;

  activeChannel: any;
  idSite: number;

  constructor(
    private storeSrv: StoreService,
    private statementsService: StatementsService,
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
      header: 'HEADER.STATEMENTS',
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
      this.statementsService.getChannelsBySite(this.idSite)
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

  generateStatement(channel){
    this.statementsService.generateStatement(channel.idSiteCanal)
    this.getChannelData(channel);
  }
  getChannelData(channel) {
    this.showStatements = false;
    this.deshabilitado = true;
    this.activeChannel = channel;
    const idChannel = channel.channelId;
    const idSiteChannel = channel.idSiteCanal;
    this.isLoading = true;
    this.statements = [];

    /*Pedimos los campos primero*/
    Observable.forkJoin(
      this.statementsService.getStatementsBySiteAndChannel(this.idSite, idChannel,idSiteChannel),
    ).subscribe(
      res => {
        this.statements = res[0];
      },
      err => {
        console.log(err);
        this.translationsAndModal('STATEMENTS.INFORMATION_TITLE', 'STATEMENTS.ERR_MESSAGE', err);
      },
      () => {

        this.deshabilitado = false;
        this.isLoading = false;

      }
    );
  }

  toggleStatements() {
    this.showStatements = !this.showStatements;
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
