import { MOCK_PUBLICATION_RESULTS_PRODUCTS } from 'app/pages/publications/results/shared/mock-data';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { PublicationResultsService } from 'app/pages/publications/results/shared/publication-results.service';
// import { MdDialog } from '@angular/material';
import { StoreService } from 'app/shared/store.service';
import { Data } from 'app/pages/publications/results/shared/data';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { TranslateService } from 'app/services/translate.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'chm-publication-results-detail-table',
  templateUrl: './publication-results-detail-table.component.html',
  styleUrls: ['./publication-results-detail-table.component.css']
})
export class PublicationResultsDetailTableComponent implements OnInit {

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  @Input() idPublicationResult: number;
  private publicationResultsProducts: any[] = [];
  publicationResultsProductsOK = [];
  publicationResultsProductsErrors = [];

  
  columns = [];
  selected = [];
  isLoading = true;
  filterWithErrors = false;
  showAll = true;
  showWithoutErros = false;
  showWithErrors = false;

  flag: number;
  private temp: any[] = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private storeSrv: StoreService,
    private publicationResultsService: PublicationResultsService,
    private router: Router,
    private data: Data,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.setColumns();
    // Parameter "1", change this when publications module has been implemented
    this.updatePublicationResultsProducts(1, this.idPublicationResult);
  }

  updatePublicationResultsProducts(idPublication, idPublicationResult) {
    this.isLoading = true;
    if (!this.filterWithErrors) {
      if (environment.mock) {
        this.publicationResultsProducts = MOCK_PUBLICATION_RESULTS_PRODUCTS;
        this.setSelected(this.publicationResultsProducts)
      } else {
        this.isLoading = true;
        this.publicationResultsService.getPublicationResult(idPublication, idPublicationResult).subscribe(
          data => {
            this.publicationResultsProducts = data[0],
            this.flag = data[1];
            this.setSelected(this.publicationResultsProducts)
            this.isLoading = false;
            this.temp = [...this.publicationResultsProducts];

            //Filtros por estados

            this.stateLists();
          }
        );
      }
    } else {
      if (environment.mock) {
        this.publicationResultsProducts = MOCK_PUBLICATION_RESULTS_PRODUCTS;
        this.setSelected(this.publicationResultsProducts)
      } else {
        this.isLoading = true;
        this.publicationResultsService.getPublicationResult(idPublication, idPublicationResult).subscribe(
          data => {
            this.publicationResultsProducts = [];
            data[0].forEach(element => {
              if (element.error != null) {
                this.publicationResultsProducts.push(element);
              }
            });
            this.temp = [...this.publicationResultsProducts];
            this.setSelected(this.publicationResultsProducts)
            this.isLoading = false;
          }
        );
      }
    }

  }

  setSelected(PublicationResultsdetail) {
    let i = 0;
    for (let key in PublicationResultsdetail) {
      if (PublicationResultsdetail[i]['ok'] == false || PublicationResultsdetail[i]['error'] != '') {
        this.selected.push(PublicationResultsdetail[i]);
      }
      i++;
    }
  }

  private setColumns() {
    this.columns = [
      {
        name: 'ID Item Channel',
        prop: 'idItemChannel',
        draggable: false,
        flexGrow: 2
      },
      {
        name: 'Product ID',
        prop: 'idProducto',
        draggable: false,
        flexGrow: 1.5
      },
      {
        name: 'Size',
        prop: 'variants.size',
        draggable: false,
        flexGrow: 1.5
      },
      {
        name: 'Stock',
        prop: 'variants.stock',
        draggable: false,
        flexGrow: 1
      },
      {
        name: 'Price',
        prop: 'price',
        draggable: false,
        flexGrow: 1
      },
      {
        name: 'Sku Hermes Channel',
        prop: 'variants.skuHermesChannel',
        draggable: false,
        flexGrow: 1.5
      },
      {
        name: 'Error',
        prop: 'error',
        draggable: false,
        flexGrow: 4.5
      }
    ];
  }


  rowClass = (row) => {
    return {
      'red-border': (() => { return (row.error != null && row.ok == false) })(),
      'yellow-border': (() => { return row.error != null && row.ok == true })()
    };
  }

  filterErrors() {
    this.isLoading = true;
    this.filterWithErrors = !this.filterWithErrors
    // Parameter "1", change this when publications module has been implemented
    this.updatePublicationResultsProducts(1, this.idPublicationResult);
  }


  updateFilter(event, opt) {
    const val = event.target.value.toLowerCase();
    // filter our data
    //Si opt = 0--> filtra alfa, si opt = 1 filtra por iditemchannel
    if (opt == 0) {
      const temp = this.temp.filter(function (d) {
        if (d.alphaCode != null) {
          return d.alphaCode.toLowerCase().indexOf(val) !== -1 || !val;
        } else {
          d.alphaCode = '-';
          return d.alphaCode.toLowerCase().indexOf(val) !== -1 || !val;
        }
      });
      // update the rows
      this.publicationResultsProducts = temp;
    } else if (opt == 1) {
      const temp = this.temp.filter(function (d) {
        if (d.idItemChannel != null) {
          return d.idItemChannel.toLowerCase().indexOf(val) !== -1 || !val;
        } else {
          d.idItemChannel = '-';
          return d.idItemChannel.toLowerCase().indexOf(val) !== -1 || !val;
        }
      });
      // update the rows
      this.publicationResultsProducts = temp;
    }


    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  filterByState(option){
    this.isLoading = true;
    if(option == 0){ //all
      this.showAll = true;
      this.showWithoutErros = false;
      this.showWithErrors = false;

    }else if(option == 1){//ok
      this.showAll = false;
      this.showWithoutErros = true;
      this.showWithErrors = false;

    } else if(option == 2){//with errors
      this.showAll = false;
      this.showWithoutErros = false;
      this.showWithErrors = true;

    } 
    this.isLoading = false;
  }


  stateLists(){
    this.publicationResultsProducts.forEach(element => {
      if (element.error != null) {
        //OK
        this.publicationResultsProductsOK.push(element);
      }else{
        //Con errores
        this.publicationResultsProductsErrors.push(element);
      }
    });
  }


}
