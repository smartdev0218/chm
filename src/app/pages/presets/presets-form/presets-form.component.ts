import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { environment } from 'environments/environment';
import {
  MOCK_CHANNELS,
  MOCK_INVENTORY_FIELDS,
  MOCK_MODEL_ATTR,
  MOCK_MODEL_TYPES
} from 'app/pages/presets/shared/mock-data';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { AlertDialogComponent } from '../../../util/alert-dialog/alert-dialog.component';

@Component({
  selector: 'chm-presets-form',
  templateUrl: './presets-form.component.html',
  styleUrls: ['./presets-form.component.css']
})
export class PresetsFormComponent implements OnInit {

  title: string;
  presetTypes = [];
  channels = [];
  inventoryFields = [];

  isLoading = true;
  isLoadingModelType = false;
  formMode: string;
  customModelValid = true;

  data: any;
  model: any;
  public onClose: Subject<any>;


  constructor(private bsModalRef: BsModalRef,
              private appDataService: AppDataService,
              private presetsService: PresetsService,
              private modalService: BsModalService) {
    this.data = appDataService.getData();
    console.log('PresetsFormComponent => ' + JSON.stringify(this.data));
  }

  ngOnInit() {

    this.onClose = new Subject();

    if (environment.mock) {
      this.presetTypes = MOCK_MODEL_TYPES;
      this.channels = MOCK_CHANNELS;
      this.inventoryFields = MOCK_INVENTORY_FIELDS;
      this.isLoading = false;
    } else {

      Observable.forkJoin(
        this.presetsService.getModelTypes(),
        this.presetsService.getChannels(),
        this.presetsService.getInventoryFields()
      ).subscribe(
        res => {
          // console.log('presetTypes => ' + res[0]);
          this.presetTypes = res[0];
          // console.log('channels => ' + res[1]);
          this.channels = res[1];
          // console.log('inventoryFields => ' + res[2]);
          this.inventoryFields = res[2];
        },
        err => {
          console.log(err);
        },
        () => {
          this.isLoading = false;
        }
      );
    }

    if (this.data.input) {
      if (this.data.input.fromPublication) {
        this.title = 'PRESETS.NEW_PRESET';
        this.formMode = 'Edit';
        this.model = this.data.input;
        this.getAttr();
      } else {
        this.title = 'PRESETS.EDIT_PRESET';
        this.formMode = 'Edit';
        this.model = this.data.input;
        this.getEditFormAttr();
      }

    } else {
      this.title = 'PRESETS.NEW_PRESET';
      this.formMode = 'New';
      this.model = { modelId: 0, modelName: '', channelId: '', modelTypeId: '', modelAttributes: [] };
    }
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  save(form): void {
    if (this.isFormInvalid(form)) {
      return;
    }
    const modelValue = { idModel: 0, modelName: 0, channelId: 0, modelTypeId: 0, modelAttributes: [] };
    modelValue.idModel = this.model.modelId;
    modelValue.modelName = this.model.modelName;
    modelValue.channelId = this.model.channelId;
    modelValue.modelTypeId = this.model.modelTypeId;

    this.model.modelAttributes.map(function (item) {
      let tAttributeValue = '';
      if (item.attributeValue) {
        tAttributeValue = String(item.attributeValue);
      } else if (item.attributeValue === null) {
        tAttributeValue = '';
      }
      modelValue.modelAttributes.push({
        idAttributeModelChannel: {
          idAttributeModelChannel: item.idAttributeModelChannel.idAttributeModelChannel
        }, attributeValue: tAttributeValue
      });
      return 'V';
    });

    console.log(JSON.stringify(modelValue));

    if (modelValue.idModel) {
      this.presetsService.updateModel(modelValue).subscribe(() => {
        this.onClose.next({ model: modelValue });
        this.bsModalRef.hide();
      }, err => this.showError(err));
    } else {
      this.presetsService.addModel(modelValue).subscribe(() => {
        this.onClose.next({ model: modelValue });
        this.bsModalRef.hide();
      }, err => this.showError(err));
    }
  }

  private showError(err) {
    this.modalService.show(AlertDialogComponent, {
      initialState: {
        title: err.error,
        msg: err.message
      }
    });
  }

  getAttr() {
    if (this.model.channelId && this.model.modelTypeId) {
      if (environment.mock) {
        this.model.modelAttributes = MOCK_MODEL_ATTR.map(function (item) {
          return { idAttributeModelChannel: item, attributeValue: '' };
        });
      } else {
        this.isLoadingModelType = true;
        this.presetsService.getModelAttr(this.model.channelId, this.model.modelTypeId)
            .pipe(finalize(() => this.isLoadingModelType = false))
            .subscribe(data => this.model.modelAttributes = data.map(function (item) {
              return { idAttributeModelChannel: item, attributeValue: '' };
            }));
      }
    }
  }

  isEditForm() {
    return this.formMode === 'Edit';
  }

  getEditFormAttr() {
    const tData = this.data;
    this.presetsService.getModelAttr(this.model.channelId, this.model.modelTypeId)
      .subscribe(data => this.model.modelAttributes = data.map(function (item) {
        let tModelAttribute = null;
        // console.log('tData => ' + JSON.stringify(tData));
        if (tData.input) {
          // Find Model Attribute
          // console.log('item => ' + JSON.stringify(item));
          // console.log('item.idAttributeModelChannel => ' + item.idAttributeModelChannel);
          tModelAttribute = tData.input.modelAttributes.filter(function (obj) {
            return obj.idAttributeModelChannel.idAttributeModelChannel === item.idAttributeModelChannel;
          });
          // console.log('tModelAttribute => ' + JSON.stringify(tModelAttribute[0]));
          // console.log('tModelAttribute.attributeValue => ' + tModelAttribute[0].attributeValue);
          if (tModelAttribute[0]) {
            // console.log('111');
            // console.log(item.idAttributeModelChannel + ' -> ' + tModelAttribute[0].attributeValue);
            return { idAttributeModelChannel: item, attributeValue: String(tModelAttribute[0].attributeValue) };
          } else {
            // console.log('222');
            return { idAttributeModelChannel: item, attributeValue: '' };
          }
        }
        // console.log('333');
        return { idAttributeModelChannel: item, attributeValue: '' };
      }));
  }

  isFormInvalid(form) {
    return form.invalid || (this.isCustomModel() && !this.customModelValid);
  }

  setCustomModelValid(isValid: boolean) {
    this.customModelValid = isValid;
  }

  isCustomModel() {
    return !this.isLoadingModelType &&
        this.model.modelTypeId == 5 &&
        this.model.modelAttributes &&
        this.model.modelAttributes.length > 0;
  }
}
