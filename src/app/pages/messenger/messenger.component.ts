import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { MessengerService } from './shared/messenger.service';
import { StoreService } from '../../shared/store.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Channel } from './model/channel.model';
import { Message } from './model/message.model';
import { AppDataService } from '../../shared/app-data.service';
import { BsModalService } from 'ngx-bootstrap';
import { MessengerReplyComponent } from './reply/reply.component';
import { PagedData } from '../../data/paged-data';
import { ProductDetailComponent } from '../inventory/product-detail/product-detail.component';

@Component({
    selector: 'app-messenger',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, OnDestroy {

    private readonly PAGE_SIZE = 10;
    private unsubscribe = new Subject<void>();

    isLoadingChannels = true;
    isLoadingAnsweredMessages = true;
    isLoadingUnansweredMessages = true;
    showGlobalLoading = false;
    channels: Channel[];
    selectedChannel: Channel;
    unansweredMessages = new PagedData<Message>();
    answeredMessages = new PagedData<Message>();
    hermesAdminUrl: string;

    constructor(private breadcrumbService: BreadcrumbService,
                private messengerService: MessengerService,
                private storeService: StoreService,
                private appDataService: AppDataService,
                private modalService: BsModalService) {
        storeService.siteChanged$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this._loadChannels());
    }

    ngOnInit(): void {
        this.hermesAdminUrl = localStorage.getItem('hermesAdminUrl');
        this.breadcrumbService.setCurrent({
            description: '',
            display: true,
            header: 'HEADER.MESSENGER',
        });
        if (this.storeService.getSite()) {
            this._loadChannels();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    loadChannelMessages(): void {
        if (this.selectedChannel) {
            this._loadAnsweredMessages(0);
            this._loadUnansweredMessages(0);
        } else {
            MessengerComponent._resetPaginatedData(this.answeredMessages);
            MessengerComponent._resetPaginatedData(this.unansweredMessages);
        }
    }

    setAnsweredMessagesPage(pageInfo): void {
        this._loadAnsweredMessages(pageInfo.offset);
    }

    setUnansweredMessagesPage(pageInfo): void {
        this._loadUnansweredMessages(pageInfo.offset);
    }

    openAnswerDialog(message: Message): void {
        this.appDataService.setData({
            input: {
                message,
                channel: this.selectedChannel
            }
        });
        let modal = this.modalService.show(MessengerReplyComponent, {
            backdrop: 'static'
        });
        modal.content.onClose.subscribe(result => {
            if (result) {
                this.loadChannelMessages();
            }
        });
    }

    refreshMessages(): void {
        this._loadAnsweredMessages(0);
        this._loadUnansweredMessages(0);
    }

    showProductDetails(productId: string): void {
        this.appDataService.setData({
            input: {
                channelProductId: productId,
                idSiteCanal: this.selectedChannel.idSiteCanal
            }
        });
        this.modalService.show(ProductDetailComponent, { backdrop: 'static' });
    }

    showOrderDetails(orderId: string): void {
        this.showGlobalLoading = true;
        this.messengerService.getOrderByChannelOrderId(orderId)
            .pipe(
                takeUntil(this.unsubscribe),
                finalize(() => this.showGlobalLoading = false))
            .subscribe(order => {
                window.open(this.hermesAdminUrl + '/oms.do?metodo=detalle&idPedido=' + order.idPedido, '_blank');
            });
    }

    export(type: string, answered: boolean): void {
        let contentType;
        let extension;
        switch (type) {
            case 'XLS':
                contentType = 'application/vnd.ms-excel';
                extension = 'xls';
                break;
            case 'PDF':
                contentType = 'application/pdf';
                extension = 'pdf';
                break;
            case 'CSV':
                contentType = 'text/csv';
                extension = 'csv';
                break;
            default:
                throw new Error('Unknown export type: ' + type);
        }
        this.showGlobalLoading = true;
        this.messengerService.exportChannelMessages(this.selectedChannel.idSiteCanal, answered, contentType)
            .pipe(
                takeUntil(this.unsubscribe),
                finalize(() => this.showGlobalLoading = false))
            .subscribe(blob => {
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.className = "hidden";
                anchor.href = url;
                anchor.download = 'messages.' + extension;
                document.body.appendChild(anchor);
                anchor.click();
                window.URL.revokeObjectURL(url);
            });
    }

    private _loadChannels(): void {
        this.isLoadingChannels = true;
        this.messengerService.getChannels$().pipe(
            takeUntil(this.unsubscribe),
            finalize(() => this.isLoadingChannels = false)
        ).subscribe(channels => this.channels = channels,
            err => console.log('_loadChannels.Error => ' + JSON.stringify(err)));
    }

    private _loadAnsweredMessages(pageNumber: number): void {
        this.isLoadingAnsweredMessages = true;
        this.messengerService.getChannelMessages(this.selectedChannel.idSiteCanal, true, pageNumber, this.PAGE_SIZE).pipe(
            takeUntil(this.unsubscribe),
            finalize(() => this.isLoadingAnsweredMessages = false)
        ).subscribe(result => this.answeredMessages = result,
            err => console.log('_loadAnsweredMessages.Error => ' + JSON.stringify(err)));
    }

    private _loadUnansweredMessages(pageNumber: number): void {
        this.isLoadingUnansweredMessages = true;
        this.messengerService.getChannelMessages(this.selectedChannel.idSiteCanal, false, pageNumber, this.PAGE_SIZE).pipe(
            takeUntil(this.unsubscribe),
            finalize(() => this.isLoadingUnansweredMessages = false)
        ).subscribe(result => this.unansweredMessages = result,
            err => console.log('_loadUnansweredMessages.Error => ' + JSON.stringify(err)));
    }

    private static _resetPaginatedData(paginatedData: PagedData<Message>): void {
        paginatedData.data = [];
        paginatedData.page.pageNumber = 0;
        paginatedData.page.size = 10;
        paginatedData.page.totalElements = 0;
        paginatedData.page.totalPages = 0;
    }
}
