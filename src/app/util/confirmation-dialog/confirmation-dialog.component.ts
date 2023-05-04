import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from 'app/services/translate.service';
@Component({
  selector: 'chm-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  msg: string;

  public onClose: Subject<any>;

  constructor(public bsModalRef: BsModalRef, private translate: TranslateService) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public ok(): void {
    this.onClose.next({ 'status': 'ok' });
    this.bsModalRef.hide();
  }

  public cancel(): void {
    this.onClose.next({ 'status': 'cancel' });
    this.bsModalRef.hide();
  }

}
