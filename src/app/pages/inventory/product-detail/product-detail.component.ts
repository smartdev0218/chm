import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { AppDataService } from 'app/shared/app-data.service';
import { MOCK_CHANNELS, MOCK_PRODUCT_DETAIL, MOCK_PUBLICATIONS } from 'app/pages/inventory/shared/mock-data';
import { environment } from 'environments/environment';

import { InventoryService } from 'app/pages/inventory/shared/inventory.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { ActionConfirmationComponent } from 'app/pages/inventory/action-confirmation/action-confirmation.component';

declare var jQuery: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  bsModalRef1: BsModalRef;
  isLoading = true;
  formMode: string;
  productDetail = [];
  productChannels =[];
  channeldatafound = [];
  publications = [];
  publicationslist = [];
  publicationsStatuslist1 = [];
  publicationsStatuslist2 = [];
  publicar =0;
  dejardepublicar =1;
  publicationsStatuslistFinal = [];
  data: any;
  model: any;
  public onClose: Subject<any>;
  filterargs = { modelTypeId: 1 };
  


  constructor(
    public bsModalRef: BsModalRef, private appDataService: AppDataService
    , private modalService: BsModalService, private inventoryService: InventoryService) {
    this.data = appDataService.getData();
  }

  ngOnInit() {
  	this.onClose = new Subject();
    this.isLoading = true;
    if (environment.mock) {
      this.productDetail = MOCK_PRODUCT_DETAIL;
      this.productChannels = MOCK_CHANNELS;
      this.publications = MOCK_PUBLICATIONS;
      this.isLoading = false;
    }else{
        const input = this.data.input;
        const productId = input.productId;
        Observable.forkJoin(
            productId ? this.inventoryService.getProductDetail(productId) : this.inventoryService.getChannelProductDetail(input.idSiteCanal, input.channelProductId),
            this.inventoryService.getChannels(),
            this.inventoryService.getPublications()
        ).subscribe(
              res => {
                this.productDetail = res[0];
                this.productChannels = res[1];
                this.publications = res[2];
              },
              err => {
                console.log(err);
                this.onCancel();
              },
              () => {
                this._combinePublications(this.productDetail, this.publications);
                this.isLoading = false;
              }
            );
    }

  }

  goProductConfirmationForm(model, publicationid, productDetail) {
    this.appDataService.setData({ status: model, pubId: publicationid, proDetail: productDetail });
    this.bsModalRef1 = this.modalService.show(ActionConfirmationComponent);
    
    (<ActionConfirmationComponent>this.bsModalRef1.content).onClose.subscribe(result => {
      if (result.status === 'ok' && result.publishStatus === 0) {
        this.inventoryService.publishProductPublications(publicationid, productDetail.productId).subscribe(
              res => {
                this.refreshPopup();
              },
              err => {
                console.log(err);
              }
            );
      }else if( result.status === 'ok' && result.publishStatus === 1) {
        this.inventoryService.unpublishProductPublications(publicationid, productDetail.productId).subscribe(
              res => {
                this.refreshPopup();
              },
              err => {
                console.log(err);
              }
            );
      }
      
    });

  }

  refreshPopup(){
    // this.productDetail = [];
    // this.productChannels =[];
    // this.channeldatafound = [];
    this.publications = [];
    this.publicationslist = [];
    this.publicationsStatuslist1 = [];
    this.publicationsStatuslist2 = [];
    this.publicar =0;
    this.dejardepublicar =1;
    this.publicationsStatuslistFinal = [];
    this.ngOnInit();
    this.isLoading = false;
  }


  private _combinePublications(productdetail, listpublications){
    for( let publicationdetail of productdetail.publishInDetail ){
        const datahash = {"publicationName": this.getPublicationName(publicationdetail.publication.publicationId)};
        const mergedHash = Object.assign(publicationdetail.publication, datahash);
        this.publicationsStatuslist1.push(mergedHash);
    }
    for(let publica of listpublications){
      this.publicationsStatuslist2.push(publica);
    }
     let data1 = [];
     let data2 = [];
     for(let publicationid1 of this.publicationsStatuslist1){
       data1.push(publicationid1.publicationId);
     }
     this.publicationsStatuslistFinal = this.publicationsStatuslist2.filter(pubStatus2 => data1.indexOf(pubStatus2.publicationId) == -1)
     this.getPublicationCount()
  }

  getPublicationName(publicationId){
    for ( let pub of this.publications){
        if(publicationId === pub.publicationId){
          return pub.name;
        }
    }
  }


  getPublicationCount(){

    for(var i = 0; i <  this.productChannels.length; i++ ){
      for (var j = 0; j <  this.publicationsStatuslistFinal.length; j++) {
        if (this.publicationsStatuslistFinal[j]['channel']['channelId'] == this.productChannels[i]['channelId']){
          this.channeldatafound.push(this.productChannels[i]['channelId'])
        }
      }
      for (var k = 0; k <  this.productDetail['publishInDetail'].length; k++) {
        if (this.productDetail['publishInDetail'][k]['publication']['channel']['channelId'] == this.productChannels[i]['channelId']){
          this.channeldatafound.push(this.productChannels[i]['channelId'])
        }
      }
    }
  }
  
  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }


}
