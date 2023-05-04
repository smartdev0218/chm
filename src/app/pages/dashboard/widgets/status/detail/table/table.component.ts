
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { DetailHistoryItem } from './detail-history-item';
import { Router } from '@angular/router';
import { DashboardStatusService } from './../../status.service';
import { StoreService } from 'app/shared/store.service';
import { environment } from 'environments/environment';
import { MOCK_CHANNEL_STATUS_HISTORY } from 'app/mock-api';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
    selector: 'chm-dashboard-status-detail-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class DashboardStatusDetailTableComponent implements OnInit {

    @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>;
    @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>;

    @Input() idChannel: number;

    columns = [];
    columnWidths = [];

    isLoading = false;

    rows;

    constructor(
        private statusService: DashboardStatusService,
        private storeService: StoreService,
        private router: Router,
        public bsModalRef: BsModalRef) {
    }

    ngOnInit() {


        if (environment.mock) {
            this.rows = MOCK_CHANNEL_STATUS_HISTORY;
        } else {
            this.isLoading = true;
            this.statusService.getChannelHistory(this.idChannel)
                .subscribe(
                    res => {
                        this.isLoading = false;
                        this.rows = res;
                        this.columns.forEach((col: any) => {
                            const colWidth = this.columnWidths.find(colWidth => colWidth.column === col.prop);
                            if (colWidth) {
                              col.width = colWidth.width;
                            }
                          });
                    },
                    err => {
                        console.log(err);
                    }
                );
        }

        this.columns = [
            {
                name: 'Ejecución',
                prop: 'checkType',
                resizeable: false,
                draggable: false,
                canAutoResize: false
            },
            {
                name: 'Fecha',
                prop: 'date',
                resizeable: false,
                draggable: false,
                canAutoResize: false
            },
            {
                name: 'Hora',
                prop: 'time',
                resizeable: false,
                draggable: false,
                canAutoResize: false
            },
            {
                name: 'Metodos',
                prop: 'methods',
                resizeable: false,
                draggable: false,
                canAutoResize: false,
            }, {
                name: 'Status',
                prop: 'status',
                resizeable: false,
                draggable: false,
                canAutoResize: false,
                cellTemplate: this.cellTemplate
            }
        ];


        this.columnWidths = [
            { column: "checkType", width: 100 },
            { column: "date", width: 150 },
            { column: "time", width: 100 },
            { column: "methods", width: 150 },
            { column: "status", width: 50 }
        ]
    }


    goPublicationResultList(exec) {
        if (exec) {
            var id = exec.idPublication;
            var route = '/publications/results/' + id;
            this.bsModalRef.hide();
            this.router.navigate([route],
                {
                    queryParams: {
                        exec: JSON.stringify(exec.resultadoPublicacion.idResultadoPublicacion),
                        id: id
                    }
                }
            );
        }
    }
}
