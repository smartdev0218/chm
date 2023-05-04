import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { MethodsService } from 'app/pages/configuration/methods/shared/methods.service';
import { environment } from 'environments/environment';
import { TranslateService } from 'app/services/translate.service';

@Component({
  selector: 'chm-method-form',
  templateUrl: './method-form.component.html',
  styleUrls: ['./method-form.component.css']
})
export class MethodFormComponent implements OnInit {

  title: string;

  isLoading = true;

  methodModel: any;
  activeChannel: any;

  public onClose: Subject<any>;
  data: any;

  constructor(
    public bsModalRef: BsModalRef, private appDataService: AppDataService
    , private methodsService: MethodsService
    , private translate: TranslateService) {
    this.data = appDataService.getData();
    this.activeChannel = this.data.activeChannel;
    // console.log('MethodFormComponent => ' + JSON.stringify(this.data));
  }


  ngOnInit() {
    this.onClose = new Subject();

    if (environment.mock) {
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }

    if (this.data.mode === 'view') {
      this.translate.getTranslate().get(['METHODS.FORM_MODE_VIEW']).subscribe(translation => {
        this.title = translation['METHODS.FORM_MODE_VIEW'];
      });
      this.methodModel = this.data.input;
    } else if (this.data.mode === 'edit') {

      this.translate.getTranslate().get(['METHODS.FORM_MODE_EDIT']).subscribe(translation => {
        this.title = translation['METHODS.FORM_MODE_EDIT'];
      });
      this.methodModel = this.data.input;
    } else {
      this.translate.getTranslate().get(['METHODS.FORM_MODE_NEW']).subscribe(translation => {
        this.title = translation['METHODS.FORM_MODE_NEW'];
      });
      this.methodModel = { methodId: 0, active: false, channel: this.activeChannel, name: '', commandPublication: '', commandSite: '', periodHours: 0, periodMinutes: 0 };
    }
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  save(f) {
    let result;
    // let modelValue = f.value;
    // console.log(JSON.stringify(modelValue));
    console.log(JSON.stringify(this.methodModel));

    const modelValue = { methodId: 0, active: false, channel: this.activeChannel, name: '', commandPublication: '', commandSite: '', periodHours: 0, periodMinutes: 0 };
    modelValue.methodId = this.methodModel.methodId;
    modelValue.active = this.methodModel.active;
    modelValue.channel = this.methodModel.channel;
    modelValue.name = this.methodModel.name;
    modelValue.commandPublication = this.methodModel.commandPublication;
    modelValue.commandSite = this.methodModel.commandSite;
    modelValue.periodHours = this.methodModel.periodHours;
    modelValue.periodMinutes = this.methodModel.periodMinutes;

    // console.log(JSON.stringify(modelValue));

    if (modelValue.methodId) {
      result = this.methodsService.updateMethod(modelValue).subscribe(data => {
        this.onClose.next({ model: modelValue });
        this.bsModalRef.hide();
      });
    } else {
      result = this.methodsService.addMethod(modelValue).subscribe(data => {
        this.onClose.next({ model: modelValue });
        this.bsModalRef.hide();
      });
    }

  }

  onChange($event) {
    this.methodModel.active = $event.target.checked;
  }

}
