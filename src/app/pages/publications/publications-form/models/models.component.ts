import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { MOCK_MODEL_TYPES, MOCK_MODELS } from 'app/pages/publications/shared/mock-data';
import { Modeltype } from 'app/pages/publications/publications-form/data/formData.model';
import { BsModalRef, BsModalService, TabDirective } from 'ngx-bootstrap';
import { PresetsFormComponent } from 'app/pages/presets/presets-form/presets-form.component';
import { AppDataService } from 'app/shared/app-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { TranslateService } from 'app/services/translate.service';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  bsModalRef: BsModalRef;
  models: any[];
  modelTypes: Modeltype[];
  form: any;
  filterargs = { modelTypeId: 1 };

  isLoading = true;

  rulesForm: FormGroup;
  debug = false;
  channelId;
  isMercadoLibre = false;
  tabIdActive: number;

  constructor(private storeSrv: StoreService
    , private publicationsService: PublicationsService
    , private router: Router
    , private formDataService: FormDataService
    , private modalService: BsModalService
    , private appDataService: AppDataService
    , private translate: TranslateService) {
  }

  ngOnInit() {
    this.init()
  }


  init() {
    this.models = this.formDataService.getModels();
    this.debug = this.formDataService.debug;

    if (this.formDataService.viewCacheData.model_models) {

      this.models = this.formDataService.viewCacheData.model_models;
      this.modelTypes = this.formDataService.viewCacheData.model_modelTypes;
      this.isLoading = false;

    } else if (environment.mock) {
      this.models = MOCK_MODELS;
      //this.modelTypes = MOCK_MODEL_TYPES;
      this.formDataService.viewCacheData.model_models = MOCK_MODELS;
      this.formDataService.viewCacheData.model_modelTypes = MOCK_MODEL_TYPES;
      this.isLoading = false;
    } else {
      this.loadModels();
    }

    let formModels = this.formDataService.getModels();

    if (this.formDataService.testing) {
      formModels = [{ "modelId": "1", "modelName": "Modelo de Precio de Prueba" }, { "modelId": "2", "modelName": "Modelo de Descripcion de Prueba" }, { "modelId": "3", "modelName": "Modelo de Envío de Prueba" }, { "modelId": "5", "modelName": "Modelo de Stock de Prueba 4" }];
    }


    // if (this.formDataService.viewCacheData.model_models) {
    //   console.log('formModels(viewCacheData) => ' + JSON.stringify(formModels));
    // } else if (this.formDataService.publicacionModel['publicationId']) {
    //   console.log('Model Form Edit Mode => ' + this.formDataService.publicacionModel['publicationId']);
    //   formModels = this.formDataService.publicacionModel['models'];
    //   console.log('Publication Models => ' + JSON.stringify(formModels));
    // }

    if (formModels.length) {
      this.rulesForm = new FormGroup(this.getFormControls(formModels));
    } else {
      this.rulesForm = new FormGroup({
        price: new FormControl(''),
        description: new FormControl(''),
        send: new FormControl(''),
        stock: new FormControl(''),
        mercadoLibreSettings: new FormControl('')
      });
    }

    if (this.formDataService.getFormData().channel.channelId) {
      this.channelId = this.formDataService.getFormData().channel.channelId;
      this.isMercadoLibre = this.channelId === 26;
    }
  }

  private loadModels() {
    Observable.forkJoin(
        this.publicationsService.getModels(),
        this.publicationsService.getModelTypes()
    ).subscribe(
        res => {
          this.models = res[0];
          this.formDataService.viewCacheData.model_models = res[0];
          this.modelTypes = res[1];
          let formModels = this.formDataService.getModels();
          for (let i = 0; i < this.modelTypes.length; i++) {

            let paramsAux = [this.modelTypes[i].name];
            let modelNameAux = '';
            if (this.modelTypes[i].idModelType == 1) {
              modelNameAux = 'price';
            } else if (this.modelTypes[i].idModelType == 2) {
              modelNameAux = 'description';
            } else if (this.modelTypes[i].idModelType == 3) {
              modelNameAux = 'send';
            } else if (this.modelTypes[i].idModelType == 4) {
              modelNameAux = 'stock';
            } else if (this.modelTypes[i].idModelType == 5) {
              modelNameAux = 'mercadoLibreSettings';
              paramsAux = [this.translate.getTranslate().instant('ML_SETTINGS.NAME')];
            } else if (this.modelTypes[i].idModelType == 7) {
              modelNameAux = 'alertPrice';
			} else if (this.modelTypes[i].idModelType == 8) {
              modelNameAux = 'alertStock';
			} else if (this.modelTypes[i].idModelType == 9) {
              modelNameAux = 'alertRef';
			} else if (this.modelTypes[i].idModelType == 10) {
              modelNameAux = 'alertMinPrice';
			}
            let modelNone = {
              modelTypeId: this.modelTypes[i].idModelType,
              modelTypeName: this.modelTypes[i].name,
              modelId: 0,
              modelName: this.translate.getTranslate().instant('PUBLICATION.NO_MODEL_OF_TYPE', paramsAux),
              type: modelNameAux
            };
            this.models.push(modelNone);
            let included = false;
            for (let j = 0; j < formModels.length; j++) {

              if (formModels[j].modelId == this.modelTypes[i].idModelType) {
                included = true;
              }
            }
            if (!included) {

              formModels.push(modelNone);
            }
          }
          this.formDataService.setModels(formModels);
          this.rulesForm = new FormGroup(this.getFormControls(formModels));
          this.formDataService.viewCacheData.model_modelTypes = res[1];
        },
        err => {
          console.log(err);
        },
        () => {
          this.isLoading = false;
        }
    );
  }

  addModel(modelType) {

    const modelName = modelType.name === 'MERCADO_LIBRE_SETTINGS' ? this.translate.getTranslate().instant('ML_SETTINGS.NAME') : modelType.name;
    const model = { modelId: 0, modelName: modelName, channelId: this.formDataService.getFormData().channel.channelId, modelTypeId: modelType.idModelType, modelAttributes: [], fromPublication: true };

    this.appDataService.setData({ input: model });
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(PresetsFormComponent, { backdrop: 'static' });

    (<PresetsFormComponent>this.bsModalRef.content).onClose.subscribe(result => {

      let dialogTitle = 'Info'
      let dialogMsg = '';

      this.translate.getTranslate().get(['COMMON_WORDS.MODEL', 'PUBLICATION.SUCCESSFUL_RESULTS']).subscribe(
        translation => {
          console.log(translation);
          dialogTitle = translation['COMMON_WORDS.MODEL'];
          dialogMsg = translation['PUBLICATION.SUCCESSFUL_RESULTS'];
        });

      if (result) {
        this.showAlert(dialogTitle, dialogMsg + " " + result.model.modelName);
        this.loadModels();
      }
    });
  }

  onSelect(data: TabDirective, idModelType: number): void {
    this.tabIdActive = idModelType;
    this.filterargs = { modelTypeId: Number(data.id) };
  }

  getFormControls(models: any[]) {
    const jsonFormControls = {};
    let tModel = models.filter(model => model.type === 'price');
    let tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['price'] = new FormControl(tModelId);

    tModel = models.filter(model => model.type === 'description');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['description'] = new FormControl(tModelId);

    tModel = models.filter(model => model.type === 'send');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['send'] = new FormControl(tModelId);

    tModel = models.filter(model => model.type === 'stock');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['stock'] = new FormControl(tModelId);
	
	tModel = models.filter(model => model.type === 'alertMinPrice');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['alertMinPrice'] = new FormControl(tModelId);

	tModel = models.filter(model => model.type === 'alertPrice');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['alertPrice'] = new FormControl(tModelId);
	
	tModel = models.filter(model => model.type === 'alertRef');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['alertRef'] = new FormControl(tModelId);
	
	tModel = models.filter(model => model.type === 'alertStock');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['alertStock'] = new FormControl(tModelId);	
	
    tModel = models.filter(model => model.type === 'mercadoLibreSettings');
    tModelId = tModel.length ? tModel[0].modelId : '';
    jsonFormControls['mercadoLibreSettings'] = new FormControl(tModelId);

    return jsonFormControls;
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }
    const formData = this.rulesForm.value;
    const models = [];
    if (formData.price !== '') {
      models.push({ 'type': 'price', 'modelId': formData.price, 'modelName': this.getModelName(formData.price, 1).modelName });
    }
    if (formData.description !== '') {
      models.push({ 'type': 'description', 'modelId': formData.description, 'modelName': this.getModelName(formData.description, 2).modelName });
    }
    if (formData.send !== '') {
      models.push({ 'type': 'send', 'modelId': formData.send, 'modelName': this.getModelName(formData.send, 3).modelName });
    }
    if (formData.stock !== '') {
      models.push({ 'type': 'stock', 'modelId': formData.stock, 'modelName': this.getModelName(formData.stock, 4).modelName });
    }
	 if (formData.alertPrice !== '') {
      models.push({ 'type': 'alertPrice', 'modelId': formData.alertPrice, 'modelName': this.getModelName(formData.alertPrice, 7).modelName });
    }
	 if (formData.alertStock !== '') {
      models.push({ 'type': 'alertStock', 'modelId': formData.alertStock, 'modelName': this.getModelName(formData.alertStock, 8).modelName });
    }
	 if (formData.alertRef !== '') {
      models.push({ 'type': 'alertRef', 'modelId': formData.alertRef, 'modelName': this.getModelName(formData.alertRef, 9).modelName });
    }
	 if (formData.alertMinPrice !== '') {
      models.push({ 'type': 'alertMinPrice', 'modelId': formData.alertMinPrice, 'modelName': this.getModelName(formData.alertMinPrice, 10).modelName });
    }
    if (formData.mercadoLibreSettings !== '') {
      models.push({ 'type': 'mercadoLibreSettings', 'modelId': formData.mercadoLibreSettings, 'modelName': this.getModelName(formData.mercadoLibreSettings, 5).modelName });
    }
    this.formDataService.setModels(models);

    return true;
  }

  goToPrevious(form: any) {
    // if (this.save(form)) {
    //   // Navigate to the personal page
    //   this.router.navigate(['/publications/form/products']);
    // }
    this.router.navigate(['/publications/form/products']);
  }

  goToNext(form: any) {
    if (this.save(form)) {
      // Navigate to the work page
      this.router.navigate(['/publications/form/result']);
    }
  }

  private getModelName(modelId: any, modelTypeId: any) {
    // return this.models.map(data => data.modelId === modelId ? data.modelName : '');
    return this.models.find(x => x.modelId === Number(modelId) && x.modelTypeId === Number(modelTypeId));
  }

  showAlert(title: string, msg: string) {
    const initialState = {
      title: title
      , msg: msg
    };
    this.bsModalRef = this.modalService.show(AlertDialogComponent, { initialState });
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
}
