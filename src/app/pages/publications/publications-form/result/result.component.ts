import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { StoreService } from 'app/shared/store.service';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { TranslateService } from 'app/services/translate.service';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() formData: any;
  isFormValid = false;
  isLoading = true;
  bsModalRef: BsModalRef;

  constructor(
    private storeSrv: StoreService
    , private publicationsService: PublicationsService
    , private router: Router
    , public formDataService: FormDataService
    , private modalService: BsModalService
    , private translate: TranslateService
  ) { }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
    this.isFormValid = this.formDataService.isFormValid();
    this.isLoading = false;
  }

  goToGeneralForm() {
    this.router.navigate(['/publications/form/general']);
  }

  goToProductsForm() {
    this.router.navigate(['/publications/form/products']);
  }

  goToModelsForm() {
    this.router.navigate(['/publications/form/models']);
  }

  submit() {
    this.isLoading = true;
    const publicationModel = this.formDataService.getPublicationModel();


    if (this.formDataService.publicacionModel['publicationId']) {
      publicationModel['publicationId'] = this.formDataService.publicacionModel['publicationId'];
      this.publicationsService.updatePublication(publicationModel).subscribe(
        data => {
          this.showAlert('PUBLICATION_ALERT.TITLE', 'Successfully Updated.');
          this.formData = this.formDataService.resetFormData();
          this.router.navigate(['/publications']);
        },
        err => {
          if(err.message == '202 Accepted status') {
              this.showAlert('PUBLICATION_ALERT.TITLE', 'PUBLICATION_ALERT.ERR_ASYNC_SAVE');
              this.formData = this.formDataService.resetFormData();
              this.router.navigate(['/publications']);
          } else {
              this.isLoading = false;
              this.showAlert('PUBLICATION_ALERT.TITLE', err.message);
          }
        });
    } else {
      this.publicationsService.addPublication(publicationModel).subscribe(
        data => {
          this.showAlert('PUBLICATION_ALERT.TITLE', 'PUBLICATION_ALERT.SUCCESS_MESSAGE_UPDATE');
          this.formData = this.formDataService.resetFormData();
          this.router.navigate(['/publications']);
        },
        err => {
          if(err.message == '202 Accepted status') {
              this.showAlert('PUBLICATION_ALERT.TITLE', 'Parece que esta publicación tarda un poco en guardarse debido a su tamaño. Seguirá guardándose en segundo plano y se le notificará cuando se complete la operación.');
              this.formData = this.formDataService.resetFormData();
              this.router.navigate(['/publications']);
          } else {
              this.isLoading = false;
              this.showAlert('PUBLICATION_ALERT.TITLE', err.message);
          }
        });
    }
    this.isFormValid = false;
  }

  goToPrevious(form: any) {
    this.router.navigate(['/publications/form/models']);
  }

  showAlert(title: string, msg: string) {
    const initialState = {
      title: title
      , msg: msg
    };
    this.modalService.show(AlertDialogComponent, { initialState });
  }

  cancel(){
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
}
