import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PublicationsService } from 'app/pages/publications/shared/publications.service';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from 'app/services/translate.service';
import { AlertDialogComponent } from '../../../../util/alert-dialog/alert-dialog.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    bsModalRef: BsModalRef;

    debug: false;
    selected = [];
    products: any[];
    form: any;
    isLoading = true;
    isLoadingProducts = true;
    
    idsProductos = [];
    idsProductosSeleccionados = new Object();
    allSelected = false;
    page = 0;
    pageSize = 10;

    autoPublish;

    // cache our list
    temp: any[] = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private router: Router
        , private publicationsService: PublicationsService
        , private formDataService: FormDataService
        , private modalService: BsModalService
        , private translate: TranslateService
    ) {
    }

    ngOnInit() {
       
        // Preparo los IDs de productos y el listado de productos seleccionados
        var publicationModel = this.formDataService.getPublicationModel();
        console.log("publicationModel");
        console.log(publicationModel);
        this.autoPublish = publicationModel['autoPublish'];


        this.idsProductos = [];
        this.idsProductosSeleccionados = new Object();
        if(publicationModel['products'] == undefined)
            publicationModel['products'] = [];
        for(var i=0; i<publicationModel['products'].length; i++) {
            this.idsProductos.push(publicationModel['products'][i].productId);
            this.idsProductosSeleccionados[publicationModel['products'][i].productId] = false;
        }
        this.formDataService.setIdsProductosPublicacion(this.idsProductos);
        console.log("this.idsProductos");
        console.log(this.idsProductos);
        console.log("this.idsProductosSeleccionados");
        console.log(this.idsProductosSeleccionados);
                
        // Recupero los productos de la primera página
        this.loadPage(0);
        
    }

    loadPage(pageNumber : number) {
                
        console.log('loadPage('+pageNumber+')');
        this.page = pageNumber;
        
        if(this.formDataService.getPublicationModel()['products'].length == 0) {
            console.log('No hay productos en la publicación'); 
            this.products = [];
            this.temp = [];
            this.isLoading = false;
        }
        
        var idsQueryStr = "";
        var firstId = true;
        console.log('From: ' + (this.page*this.pageSize));
        console.log('To:   ' + ((this.page+1)*this.pageSize));
        for(var i=this.page*this.pageSize; i<(this.page+1)*this.pageSize; i++) {
            if(firstId == true) {
                idsQueryStr = idsQueryStr + this.idsProductos[i];
                firstId = false;
            } else {
                idsQueryStr = idsQueryStr + "|" + this.idsProductos[i];
            }
        }
        
        const productFilter = {
            filterFields: 'id-product',
            filterValues: idsQueryStr,
        };

        this.publicationsService.getProducts(productFilter).subscribe(data => {
            this.products = data;
            this.temp = data;
            this.isLoading = false;
            this.isLoadingProducts = false;
        });
    }
    
    
    setPage(pageInfo) {
        
        console.log('setPage.pageInfo');
        this.loadPage(Number(pageInfo.offset));
    }
    
    
    changeRowSelection(idProduct) {
        
        console.log("idProduct");
        console.log(idProduct);
        
        this.idsProductosSeleccionados[idProduct] = !this.idsProductosSeleccionados[idProduct];
        
        console.log("idsProductosSeleccionados");
        console.log(this.idsProductosSeleccionados);
        
//        var countSeleccionadosAux = 0;
        var allSelectedAux = true;
        this.selected = [];
        for(var i=0; i<this.idsProductos.length; i++) {
            if(this.idsProductosSeleccionados[this.idsProductos[i]] == false) {
                allSelectedAux = false;
            } else {
//                countSeleccionadosAux++;
                this.selected.push(this.idsProductos[i]);
            }
        }
        this.allSelected = allSelectedAux;
//        this.countSeleccionados = countSeleccionadosAux;
        
        console.log("allSelected");
        console.log(this.allSelected);
        
//        console.log("countSeleccionados");
//        console.log(this.countSeleccionados);
        
    }
    
    selectAllClicked() {
                
        if(this.allSelected == false) {
            
            this.selected = [];
            for(var i=0; i<this.idsProductos.length; i++) {
                this.idsProductosSeleccionados[this.idsProductos[i]] = true;
                this.selected.push(this.idsProductos[i]);
            }
            this.allSelected = true;
            
        } else {
            
            this.selected = [];
            for(var i=0; i<this.idsProductos.length; i++) {
                this.idsProductosSeleccionados[this.idsProductos[i]] = false;
            }
            this.allSelected = false;
            
        }
        
    }
    
    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        var products = [];
        for(var i=0; i<this.idsProductos.length; i++) {
            var product = new Object();
            product['productId'] = this.idsProductos[i];
            products.push(product);
        }
        
        this.formDataService.setProducts(products);
        return true;
    }

    addProducts() {
        this.bsModalRef = this.modalService.show(ProductCatalogComponent, { class: 'modal-lg', backdrop: 'static' });

        (<ProductCatalogComponent>this.bsModalRef.content).onClose.subscribe(result => {
            console.log('Result : ' + JSON.stringify(result));
            if (result.status === 'ok') {
                // Preparo los IDs de productos y el listado de productos seleccionados
                this.idsProductos = this.formDataService.getIdsProductosPublicacion();
                for(var i=0; i<this.idsProductos.length; i++) {
                    this.idsProductosSeleccionados[this.idsProductos[i]] = false;
                }
                this.formDataService.setIdsProductosPublicacion(this.idsProductos);
                console.log("this.idsProductos");
                console.log(this.idsProductos);
                console.log("this.idsProductosSeleccionados");
                console.log(this.idsProductosSeleccionados);
                        
                // Recupero los productos de la primera página
                this.loadPage(0);
            }
        });
    }

    goToPrevious(form: any) {
        // if (this.save(form)) {
        //   // Navigate to the general page
        //   this.router.navigate(['/publications/form/general']);
        // }
        this.router.navigate(['/publications/form/general']);
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the models page
            this.router.navigate(['/publications/form/models']);
        }
    }

    toggleAutoPublish() {
        this.autoPublish = !this.autoPublish;
        this.formDataService.setAutoPushishFlag(this.autoPublish);
        if (this.autoPublish) {
            this.modalService.show(AlertDialogComponent, {
                initialState: {
                    title: 'PUBLICATION.AUTO_UPDATE_BY_FILTERS',
                    msg: 'PUBLICATION.AUTO_UPDATE_BY_FILTERS_TLP'
                }
            });
        }
    }

//    onSelect({ selected }) {
//        console.log('Select Event', selected, this.selected);
//
//        this.selected.splice(0, this.selected.length);
//        this.selected.push(...selected);
//    }

//    onActivate(event) {
        // console.log('Activate Event', event);
//    }

    removeProducts() {
                
        var idsProductosAux = [];
        var idsProductosSeleccionadosAux = new Object();
        var selectedAux = [];
        for(var i=0; i<this.idsProductos.length; i++) {
            if(this.idsProductosSeleccionados[this.idsProductos[i]] == false) {
                idsProductosAux.push(this.idsProductos[i]);
                idsProductosSeleccionadosAux[this.idsProductos[i]] = false;
            }
        }
        
        this.idsProductos = idsProductosAux;
        this.idsProductosSeleccionados = idsProductosSeleccionadosAux;
        this.selected = selectedAux;
        this.allSelected = false;
        this.formDataService.setIdsProductosPublicacion(this.idsProductos);
        
        this.loadPage(0);
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
