import { MOCK_PUBLICATION_RESULTS } from 'app/pages/publications/results/shared/mock-data';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PublicationResultsService } from 'app/pages/publications/results/shared/publication-results.service';
import { PublicationResultsDetailComponent } from 'app/pages/publications/results/publication-results-detail/publication-results-detail.component';
import { StoreService } from 'app/shared/store.service';
import { Data } from 'app/pages/publications/results/shared/data';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';
import { ExportFileService } from 'app/services/export-file.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'chm-publication-results-list',
  templateUrl: './publication-results-list.component.html',
  styleUrls: ['./publication-results-list.component.css']
})
export class PublicationResultsListComponent implements OnInit {

  bsModalRef: BsModalRef;

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  columns = [];
  isLoading = true;
  params: any;
  exec: any;
  idPublicationFromStatus: any
  myWindow;
  message;
  private temp: any[] = [];
  private publicationResults: any[] = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private storeSrv: StoreService,
    private publicationResultsService: PublicationResultsService,
    private router: Router,
    private data: Data,
    private modalService: BsModalService,
    private appDataService: AppDataService,
    private route: ActivatedRoute,
    private breadServ: BreadcrumbService,
    private translate: TranslateService,
    private exportFileService: ExportFileService) {

    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  export(row, type) {

    var ext, contentType;
    switch (type) {
      case 1: {
        ext = "xlsx";
        contentType = 'application/vnd.ms-excel';
        break;
      }
      case 2: {
        ext = "pdf";
        contentType = 'application/pdf';
        break;
      }
      case 3: {
        ext = "csv";
        contentType = 'text/csv';
        break;
      }
    }

    this.translate.getTranslate().get(['COMMON_WORDS.PROCESSING_FILE']).subscribe(translation => {
      this.message = translation['COMMON_WORDS.PROCESSING_FILE'];
    });
    this.myWindow = window.open("", '_blank');
    this.myWindow.document.write(this.message + " - IDPublication: " + row.idPublicacion);

    this.exportFileService.export("PR", ext, row.idResultadoPublicacion).subscribe(
      data => {
        //Obtenemos el nombre-> attachment;filename=PublicationResult_20181213050840.csv -> PublicationResult_20181213050840.csv
        var name = data.headers.get('content-disposition').split(";")[1].split("=")[1];
        this.downloadFile(data, name, contentType);
        this.myWindow.close();
      }),
      error => console.log('Error downloading the file.')      
  }


  downloadFile(data: any, name, type) {
    let parsedResponse = data._body;
    let blob = new Blob([parsedResponse], { type: type });
    let url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['exec']) {
      this.route.queryParams.subscribe((params) => {
        this.exec = JSON.parse(params.exec);
        this.idPublicationFromStatus = JSON.parse(params.id)
      })

    }
    if (typeof this.exec !== 'undefined') {
      this.updatePublicationResults(this.idPublicationFromStatus);
      this.openDetailDialog(this.exec);
    } else {
      this.isLoading = true;
      this.setColumns();
      // Parameter "1", change this when publications module has been implemented

      let id = this.route.params.subscribe(params => {
        let id = params['id'];
        this.updatePublicationResults(id);
      });

      this.breadServ.setCurrent({
        description: '',
        display: true,
        header: 'HEADER.PUBLICATION_RESULTS'
      });

    }

  }

  onSiteChanged(id: number) {
    //this.updateStatus();
  }

  updatePublicationResults(idPublication) {
    if (environment.mock) {
      this.publicationResults = MOCK_PUBLICATION_RESULTS;
      this.temp = [...MOCK_PUBLICATION_RESULTS];
      this.isLoading = false;
    } else {
      this.publicationResultsService.getPublicationResults(idPublication).subscribe(
        data => {
          this.temp = [...data];
          this.publicationResults = data;
          this.isLoading = false;
        }
      );

    }
  }

  deletePublicationResult(publicationResult) {
    if (confirm('Are you sure you want to delete the publication result "' + publicationResult.publicationName + '?')) {
      var index = this.publicationResults.indexOf(publicationResult);
      this.publicationResults.splice(index, 1);

      this.publicationResultsService.deletePublicationResult(publicationResult.idPublicacion,
        publicationResult.idResultadoPublicacion).subscribe(null);
    }
  }

  openDetailDialog(publicationResult) {
    this.appDataService.setData({ input: publicationResult });
    this.bsModalRef = this.modalService.show(PublicationResultsDetailComponent, { backdrop: 'static' });

  }

  goPublicationList() {
    this.router.navigate(['/publications']);
  }

  private setColumns() {
    this.columns = [
      {
        name: 'Publication Name',
        prop: 'publicationName',
        draggable: false,
        flexGrow: 2
      },
      {
        name: 'Date',
        prop: 'initDate',
        draggable: false,
        pipe: new DatePipe("es"),
        flexGrow: 1
      },
      {
        name: 'Products',
        prop: 'countProducts',
        draggable: false,

        flexGrow: 1
      },
      {
        name: 'Orders',
        prop: 'countOrdes',
        draggable: false,

        flexGrow: 1
      },
      {
        name: 'Ok',
        prop: 'ok',
        draggable: false,
        flexGrow: 1
      },
      {
        name: 'Action',
        prop: 'name',
        cellTemplate: this.cellTemplate,
        flexGrow: 1
      }
    ];
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.methodName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.publicationResults = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
