import { Component, Inject, Input, Optional, OnInit } from '@angular/core';
// import { MD_DIALOG_DATA, MdDialogRef  } from '@angular/material';
import { PublicationResultsDetailTableComponent } from './table/publication-results-detail-table.component';
import { TabDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PublicationResultsService } from 'app/pages/publications/results/shared/publication-results.service';
import { AppDataService } from 'app/shared/app-data.service';
import { TranslateService } from 'app/services/translate.service';

declare var jQuery: any;

@Component({
    selector: 'chm-publication-results-detail',
    templateUrl: './publication-results-detail.component.html',
    styleUrls: ['./publication-results-detail.component.css']
})
export class PublicationResultsDetailComponent {

    idPublicationResult: number;
    publicationName: string;
	data: any;
  
  constructor(
    public bsModalRef: BsModalRef, 
  	private appDataService: AppDataService, 
  	private modalService: BsModalService, 
  	private publicationResultsService: PublicationResultsService,
    private translate: TranslateService) {
    this.data = appDataService.getData();
    jQuery("body").addClass("modal-open");
    
    if (typeof this.data.input.idResultadoPublicacion !== 'undefined') {
      this.idPublicationResult = this.data.input.idResultadoPublicacion;
      this.publicationName = this.data.input.publicationName;
    }else{
      this.idPublicationResult = this.data.input;
    } 
  }


  public cancel(): void {
    this.bsModalRef.hide();
  }
  
}
