import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'app/shared/store.service';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { AppDataService } from 'app/shared/app-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { environment } from 'environments/environment';
import { MOCK_PUBLICATIONS } from 'app/pages/publications/shared/mock-data';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { TranslateService } from 'app/services/translate.service';
import * as EventSource from 'eventsource';


@Component({
  selector: 'chm-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationsListComponent implements OnInit {

  bsModalRef: BsModalRef;

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  @Input() showToolbar : boolean;
    
  isLoading = true;

  showUnposted = false;
  showOutdated = false;

  showPublications = false;
  private publications: any[] = [];
  // cache our list
  private temp: any[] = [];
  channelMethods: any[] = [];
  isLoadingMethodsDialog = true;
  runMethodChannelName = "";
  runMethodChannelId = 0;
  runMethodIdSiteCanal = 0;
  runMethodPublicationName = "";
  runMethodPublicationId = 0;
  runMethodMethodName = "";

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private storeSrv: StoreService
    , private publicationsService: PublicationsService
    , private appDataService: AppDataService
    , private modalService: BsModalService
    , private translate: TranslateService
    , private router: Router
    , private formDataService: FormDataService
    , private changeDetectorRef: ChangeDetectorRef) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {
    // reset Form cahce data
    this.formDataService.resetFormData();
      
    if(this.showToolbar === undefined)
      this.showToolbar = true;
            
    if (this.storeSrv.getSite()) {
      this.showPublications = true;
    }

    // this.setColumns();
    this.updateStatus();

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
      
      
        // Sucripción a las notificaciones de PUBLICACION_BLOQUEO, PUBLICACION_DESBLOQUEO, EJECUCION_INICIO y EJECUCION_FIN
        const eventSource = new EventSource('http://localhost:8080/chm/notification?types=PUBLICACION_BLOQUEO&types=EJECUCION_INICIO&types=EJECUCION_FIN&types=PUBLICACION_DESBLOQUEO&token='+localStorage.getItem('token'));
        eventSource.onmessage = e => {

	
            const notification = JSON.parse(e.data);
            
            console.log('Notificación recibida');
            console.log(notification);
                                  
            if(notification.type == 'PUBLICACION_BLOQUEO') {
                
                for(var i=0; i<this.temp.length; i++) {
                    if(this.temp[i].publicationId + '' == notification.title) {
                        this.temp[i].locked = true;
                    }
                }
				this.updateFilter();
                this.changeDetectorRef.markForCheck();
                this.changeDetectorRef.detectChanges();
            }
                                  
            if(notification.type == 'PUBLICACION_DESBLOQUEO') {
                
                for(var i=0; i<this.temp.length; i++) {
                    if(this.temp[i].publicationId + '' == notification.title) {
                        this.temp[i].locked = null;
                    }
                }
				this.updateFilter();
                this.changeDetectorRef.markForCheck();
                this.changeDetectorRef.detectChanges();
            }
                                  
            if(notification.type == 'EJECUCION_INICIO') {
                //alert('Inicio ' + notification.title);
                var auxIdMetodo = notification.title.split('-')[0];
                var auxIdPublicacion = notification.title.split('-')[1];
                var auxIdSiteCanal = notification.title.split('-')[2];
                var auxIdCanal = notification.title.split('-')[3];
                for(var i=0; i<this.temp.length; i++) {
                    console.log(this.temp[i]);
                    if((this.temp[i].publicationId + '' == auxIdPublicacion || auxIdPublicacion == 0) && this.temp[i].idSiteCanal + '' == auxIdSiteCanal) {
                        console.log('Entro');
                        if(this.temp[i].runningMethods == null) {
                            this.temp[i].runningMethods = [];
                        }
                        var currentlyRunning = false;
                        for(var j=0; j<this.temp[i].runningMethods.length; j++) {
                            if(this.temp[i].runningMethods[j].idMetodo + '' == auxIdMetodo) {
                                currentlyRunning = true;
                            }
                        }
                        if(!currentlyRunning && (this.temp[i].active || auxIdPublicacion != 0)) {
                            var runningMethod = {idMetodo: auxIdMetodo, nombreMetodo: notification.description};
                            console.log('Añadir runningMethod');
                            console.log(runningMethod);
                            this.temp[i].runningMethods.push(runningMethod);
                        }
                    }
                }
				this.updateFilter();
                this.changeDetectorRef.markForCheck();
                this.changeDetectorRef.detectChanges();
            }
                                  
            if(notification.type == 'EJECUCION_FIN') {
                
                var auxIdMetodo = notification.title.split('-')[0];
                var auxIdPublicacion = notification.title.split('-')[1];
                var auxIdSiteCanal = notification.title.split('-')[2];
                var auxIdCanal = notification.title.split('-')[3];
                for(var i=0; i<this.temp.length; i++) {
                    console.log(this.temp[i]);
                    if((this.temp[i].publicationId + '' == auxIdPublicacion || auxIdPublicacion == 0) && this.temp[i].idSiteCanal + '' == auxIdSiteCanal) {
                        console.log('Entro');
                        if(this.temp[i].runningMethods == null) {
                            this.temp[i].runningMethods = [];
                        }
                        for(var j=this.temp[i].runningMethods.length-1; j>=0; j--) {
                            if(this.temp[i].runningMethods[j].idMetodo + '' == auxIdMetodo) {
                                console.log('Quitar runningMethod');
                                this.temp[i].runningMethods.splice(j,1);
                            }
                        }
                    }
                }
				this.updateFilter();
                this.changeDetectorRef.markForCheck();
                this.changeDetectorRef.detectChanges();
            }
            
        };
        eventSource.onopen = e => console.log('open');
        eventSource.onerror = e => {
            if (e.readyState == EventSource.CLOSED) {
                console.log('close');
            }
            else {
                console.log(e);
            }
        };
        eventSource.addEventListener('second', function(e) {
            console.log('second', e.data);
        }, false);
  }

  onSiteChanged(id: number) {
    this.showPublications = true;
    this.updateStatus();
  }



  postPublication(model) {
    let dialogTitle = 'Dialog Title'
      , dialogMsg = 'Dialog Message';
    this.translate.getTranslate().get(['PUBLICATION.FUNC_DIALOG_TITLE', 'PUBLICATION.FUNC_DIALOG_MSG']).subscribe(
      translation => {
        console.log(translation);
        dialogTitle = translation['PUBLICATION.FUNC_DIALOG_TITLE'];
        dialogMsg = translation['PUBLICATION.FUNC_DIALOG_MSG'];
      });

    console.log("ANTES: ");
    console.log(model);

    const initialState = { title: dialogTitle, msg: dialogMsg };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { initialState });

    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('Result : ' + JSON.stringify(result));
      if (result.status === 'ok') {
        const index = this.publications.indexOf(model);
        const modelValue = { publicationId: 0, publish: false };
        modelValue.publicationId = model.publicationId;
        modelValue.publish = (model.active == true) ? false : true;

        console.log("ENVIAR = " + modelValue.publish);

        this.publicationsService.publishPublications(modelValue.publicationId, modelValue.publish)
          .subscribe(null,
            err => {
              this.showAlert('Publication', 'Could not publish/unpublish publication.');
              this.showPublications = true;
              this.publications = [...this.publications];
              this.temp = [...this.publications];
              this.showPublications = true;
              this.isLoading = true;
              this.changeDetectorRef.markForCheck();
              this.changeDetectorRef.detectChanges();
              this.isLoading = false;
              this.changeDetectorRef.markForCheck();
              this.changeDetectorRef.detectChanges();
            },
            () => {
              model.active = !model.active;
              this.showPublications = true;
              this.publications = [...this.publications];
              this.temp = [...this.publications];
              this.showPublications = true;
              this.isLoading = true;
              this.changeDetectorRef.markForCheck();
              this.changeDetectorRef.detectChanges();
              this.isLoading = false;
              this.changeDetectorRef.markForCheck();
              this.changeDetectorRef.detectChanges();
            });
      } else if (result.status === "cancel") {
        this.publications = [...this.publications];
        this.temp = [...this.publications];
        this.refreshWindow();
      }
    });

  }

  refreshWindow() {
    this.isLoading = true;
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
    this.isLoading = false;
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  updateStatus() {
    console.log('updateStatus => ' + this.isLoading);
    if (environment.mock) {
      this.publications = MOCK_PUBLICATIONS;
      this.temp = MOCK_PUBLICATIONS;
      this.isLoading = false;
		this.updateFilter();
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
    } else {
      this.publicationsService.getPublications().subscribe(data => {
        this.publications = data;
        this.temp = data;
        this.isLoading = false;
		this.updateFilter();
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      });
    }

  }

  updateFilter() {
		
    let val = null; 
	if(document.getElementById('filterPublications')) {
		val = (<HTMLInputElement>document.getElementById('filterPublications')).value;	
	}

	let uposted = this.showUnposted;
	let outdated = this.showOutdated;
		
    // filter our data
    let aux = this.temp.filter(function (d) {
      if(val && d.name.toLowerCase().indexOf(val) === -1)
        return false;
      if(!uposted && !d.active){
        return false;
      }
      if(!outdated) {
        if(d.startDate && d.startDate != null && d.startDate > new Date().getTime()) {
          return false;
        }
        if(d.finishDate && d.finishDate != null && d.finishDate < new Date().getTime()) {
          return false;
        }
      }
      return true;
    });

    // update the rows
    this.publications = aux;
    // Whenever the filter changes, always go back to the first page
	if(this.table) 
    	this.table.offset = 0;
  }


  deletePublication(model) {
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    // Fetch Dialog Labels from i18n
    let dialogTitle = 'Dialog Title'
      , dialogMsg = 'Dialog Message';
    this.translate.getTranslate().get(['PUBLICATION.DIALOG_TITLE', 'PUBLICATION.DIALOG_MSG']).subscribe(
      translation => {
        console.log(translation);
        dialogTitle = translation['PUBLICATION.DIALOG_TITLE'];
        dialogMsg = translation['PUBLICATION.DIALOG_MSG'];
      });

    const initialState = { title: dialogTitle, msg: dialogMsg };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { initialState });

    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('Result : ' + JSON.stringify(result));
      if (result.status === 'ok') {
        const index = this.publications.indexOf(model);
        this.publications.splice(index, 1);

        this.publicationsService.deletePublication(model.publicationId)
          .subscribe(null,
            err => {
              this.showAlert('Publication', 'Could not delete publication.');
              // Revert the view back to its original state
              this.publications.splice(index, 0, model);
            });
      }
    });
  }


  runMethodDialog(publication) {

    this.channelMethods = [];
    console.log(this.channelMethods);
    console.log(publication);
    this.isLoadingMethodsDialog = true;
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
    this.runMethodChannelName = publication.channel.name;
    this.runMethodChannelId = publication.channel.channelId;
    this.runMethodIdSiteCanal = publication.idSiteCanal;
    this.runMethodPublicationName = publication.name;
    this.runMethodPublicationId = publication.publicationId;
    this.publicationsService.getMethodsForChannel(publication.channel.channelId).subscribe(data => {
        this.channelMethods = data;
        console.log(this.channelMethods);
        this.isLoadingMethodsDialog = false;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      })
    console.log(this.channelMethods);
    document.getElementById("openModalRunMethodButton").click();
  }

  runMethod() {

    //alert("call()");
    var selectMethod = document.getElementById("selectMethodSelected") as HTMLSelectElement;
    var methodId = selectMethod.options[selectMethod.selectedIndex].value;
    var methodName = selectMethod.options[selectMethod.selectedIndex].text;
    var selectPublication = document.getElementById("selectMethodScope") as HTMLSelectElement;
    var publicationId = selectPublication.options[selectPublication.selectedIndex].value;

    if(publicationId == "0") {
      //alert("Ejecutar método " + methodId + " para todas las publicaciones.");
      this.publicationsService.runMethodForAllPublications(methodId, this.storeSrv.getSite().id, this.runMethodIdSiteCanal).subscribe(
        data => {
        }
        );
//      for(let i=0; i<this.publications.length; i++) {
//        if(this.publications[i].channel.channelId == this.runMethodChannelId && this.publications[i].active) {
//          var exists = false;
//          for(let j=0; j<this.publications[i].runningMethods.length; j++) {
//            if(this.publications[i].runningMethods[j].idMetodo == methodId)
//              exists = true;
//          }
//          if(!exists) {
//            const newRunningMethod = { idMetodo: "0", nombreMetodo: methodName };
//            newRunningMethod.idMetodo = methodId;
//            newRunningMethod.nombreMetodo = methodName;
//            this.publications[i].runningMethods.push(newRunningMethod);
//          }
//        }
//      }
      this.isLoadingMethodsDialog = false;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
      this.isLoadingMethodsDialog = true;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
      //alert("Método lanzado. Puede consultar en la pantalla de \"Métodos en cursos\" los métodos que se están ejecutando actualmente y los últimos completados.");
      document.getElementById("closeDialog").click();
    } else {
      //alert("Ejecutar método " + methodId + " para todas las publicaciones.");
      this.publicationsService.runMethodForOnePublication(methodId, this.storeSrv.getSite().id, publicationId).subscribe(data => {});
//      for(let i=0; i<this.publications.length; i++) {
//        if(this.publications[i].publicationId == this.runMethodPublicationId) {
//          var exists = false;
//          for(let j=0; j<this.publications[i].runningMethods.length; j++) {
//            if(this.publications[i].runningMethods[j].idMetodo == methodId)
//              exists = true;
//          }
//          if(!exists) {
//            const newRunningMethod = { idMetodo: "0", nombreMetodo: methodName };
//            newRunningMethod.idMetodo = methodId;
//            newRunningMethod.nombreMetodo = methodName;
//            this.publications[i].runningMethods.push(newRunningMethod);
//          }
//        }
//      }
      this.isLoadingMethodsDialog = false;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
      this.isLoadingMethodsDialog = true;
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
      //alert("Método lanzado. Puede consultar en la pantalla de \"Métodos en cursos\" los métodos que se están ejecutando actualmente y los últimos completados.");
      document.getElementById("closeDialog").click();
    }
  }

  goEditForm(model) {
    // this.data.storage = model;
    // console.log('goEditForm.model' + JSON.stringify(model));

    // load from client
    // this.formDataService.publicacionModel = model;

    // load from server
    this.isLoading = true;
    this.publicationsService.getPublication(model).subscribe(data => {
      // this.formDataService.publicacionModel = data;
      this.formDataService.setPublicationModel(data);
      this.isLoading = false;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();;
      this.router.navigate(['/publications/form/general', model.publicationId]);
    });
  }

  goCreateForm() {
    this.formDataService.publicacionModel = {};
    this.router.navigate(['/publications/form']);
  }


  goPublicationResultList(id) {
    console.log('Go Publication result list' + JSON.stringify(id));
    var route = '/publications/results/' + id.publicationId;
    this.router.navigate([route]);
  }

  showAlert(title: string, msg: string) {
    const initialState = {
      title: title
      , msg: msg
    };
    this.modalService.show(AlertDialogComponent, { initialState });
  }

    stopMethod(runningMethod: any) {
        runningMethod.stopping = true;
        this.publicationsService.stopMethod(runningMethod.id)
            .subscribe(() => runningMethod.stopping = false);
    }
}
