import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { AppDataService } from 'app/shared/app-data.service';
import { InventoryService } from 'app/pages/inventory/shared/inventory.service';
import { ProductDetailComponent } from 'app/pages/inventory/product-detail/product-detail.component';

declare var jQuery: any;
@Component({
  selector: 'app-action-confirmation',
  templateUrl: './action-confirmation.component.html',
  styleUrls: ['./action-confirmation.component.css']
})
export class ActionConfirmationComponent implements OnInit {

  public onClose: Subject<any>;
  isLoading = true;

  data: any;
  model: any;

  constructor(public bsModalRef1: BsModalRef, private appDataService: AppDataService
    , private modalService: BsModalService, private inventoryService: InventoryService) { 
    this.data = appDataService.getData();
    console.log('ActionConfirmationComponent => ' + JSON.stringify(this.data));
  }

  ngOnInit() {
    this.onClose = new Subject();

  }

  public ok(): void {
    this.onClose.next({ 'status': 'ok', 'publishStatus': this.data.status });
    this.bsModalRef1.hide();
  }

  public cancel(): void {
    // this.onClose.next(null);
    this.bsModalRef1.hide();
  }

}
