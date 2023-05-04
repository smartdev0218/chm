import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { StoreService } from 'app/shared/store.service';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { environment } from 'environments/environment';
import { MOCK_REPORT_TOP_5_PRODUCTS } from 'app/pages/reports/shared/mock-data';
import { MOCK_REPORT_TOP_FIFTEEN } from 'app/pages/reports/shared/mock-data';
import { MOCK_REPORT_AVERAGE_TICKET } from 'app/pages/reports/shared/mock-data';
import { MOCK_REPORT_SELLS_EVOLUTION } from 'app/pages/reports/shared/mock-data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { ReportsService } from 'app/pages/reports/shared/reports.service';
import { ConfirmationDialogComponent } from 'app/util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'chm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef;

  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

  columns = [];

  isLoading = true;

  isLoadingTop5products = true;
  top5products = [];

  isLoadingTopFifteen = true;
  topFifteen = [];

  isLoadingAverageTicket = true;
  averageTicket = [];

  isLoadingSellsEvolution = true;
  sellsEvolution = [];

  private models: any[] = [];

  constructor(private storeSrv: StoreService, private reportsService: ReportsService
    , private appDataService: AppDataService
    , private modalService: BsModalService
    , private breadServ: BreadcrumbService) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {

    // setttings the header for the home
    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.REPORTS',
      
    });


	// TOP 5 PRODUCTS
	if (environment.mock) {
		this.top5products = MOCK_REPORT_TOP_5_PRODUCTS;
		this.isLoadingTop5products = false;
		this.reportsService.loadChartTop5ProductsByChannel(this.top5products);
	} else {
		this.reportsService.getTop5ProductsByChannel()
			.subscribe(data => {
				this.top5products = data;
				this.isLoadingTop5products = false;
				this.reportsService.loadChartTop5ProductsByChannel(this.top5products);
			})
	}


	// TOP FIFTEEN
	if (environment.mock) {
		this.topFifteen = MOCK_REPORT_TOP_FIFTEEN;
		this.isLoadingTopFifteen = false;
		this.reportsService.loadChartTopFifteen(this.topFifteen);
	} else {
		this.reportsService.getTopFifteen()
			.subscribe(data => {
				this.topFifteen = data;
				this.isLoadingTopFifteen = false;
				this.reportsService.loadChartTopFifteen(this.topFifteen);
			})
	}


	// AVERAGE TICKET
	if (environment.mock) {
		this.averageTicket = MOCK_REPORT_AVERAGE_TICKET;
		this.isLoadingAverageTicket = false;
		this.reportsService.loadChartAverageTicket(this.averageTicket);
	} else {
		this.reportsService.getAverageTicket()
			.subscribe(data => {
				this.averageTicket = data;
				this.isLoadingAverageTicket = false;
				this.reportsService.loadChartAverageTicket(this.averageTicket);
			})
	}

	// SELLS EVOLUTION
	if (environment.mock) {
		this.sellsEvolution = MOCK_REPORT_SELLS_EVOLUTION
		this.isLoadingSellsEvolution = false;
		this.reportsService.loadChartSellsEvolution(this.sellsEvolution);
	} else {
		this.reportsService.getSellsEvolution()
			.subscribe(data => {
				this.sellsEvolution = data;
				this.isLoadingSellsEvolution = false;
				this.reportsService.loadChartSellsEvolution(this.sellsEvolution);
			})
	}


	this.isLoading = false;
	
  }


  onSiteChanged(id: number) {
    this.isLoading = true;
    // this.updateStatus();
	
  }

  updateStatus() {
    console.log('updateStatus => ' + this.isLoading);
/*     if (environment.mock) {
      this.models = MOCK_MODELS;
      this.isLoading = false;
    } else {
      this.presetsService.getModels().subscribe(data => {
        this.models = data;
        this.isLoading = false;
      });
    } */

  }

  /*deleteModel(model) {
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, { backdrop: 'static' });

    (<ConfirmationDialogComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('Result : ' + JSON.stringify(result));
      if (result.status === 'ok') {
        const index = this.models.indexOf(model);
        this.models.splice(index, 1);

        this.presetsService.deleteModel(model.modelId)
          .subscribe(null,
            err => {
              alert('Could not delete model.');
              // Revert the view back to its original state
              this.models.splice(index, 0, model);
            });
      }
    });
  }

  goEditForm(model) {

    this.appDataService.setData({ input: model });
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(PresetsFormComponent, { backdrop: 'static' });

    (<PresetsFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.updateStatus();
      }
    });
  }

  goCreateForm() {
    this.appDataService.setData({});
    // https://github.com/valor-software/ngx-bootstrap/issues/2460
    this.bsModalRef = this.modalService.show(PresetsFormComponent, { backdrop: 'static' });

    (<PresetsFormComponent>this.bsModalRef.content).onClose.subscribe(result => {
      console.log('setConfig : ' + JSON.stringify(result));
      if (result) {
        this.updateStatus();
      }
    });
  }

  private setColumns() {
    this.columns = [
      {
        name: 'Preset Name',
        prop: 'modelName',
        draggable: false,
        flexGrow: 2
      },
      {
        name: 'Channel',
        prop: 'channelName',
        draggable: false,
        flexGrow: 1
      },
      {
        name: 'Preset Type',
        prop: 'modelTypeName',
        flexGrow: 2
      },
      {
        name: 'Action',
        prop: 'name',
        cellTemplate: this.cellTemplate,
        flexGrow: 1
      }
    ];
  }
*/
  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  } 
}
