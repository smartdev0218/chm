import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { ChmHttp } from 'app/shared/chm-http.model';
import { StoreService } from 'app/shared/store.service';
import { Channel } from '../model/channel.model';
import { Message } from '../model/message.model';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { MOCK_ANSWERED_MESSAGES, MOCK_CHANNELS, MOCK_UNANSWERED_MESSAGES } from './mock-data';
import { delay } from 'rxjs/operators';
import { PagedData } from '../../../data/paged-data';
import { PredefinedAnswer } from '../model/predefined-answer.model';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Order } from '../model/order.model';

@Injectable()
export class MessengerService extends ChmHttp {

    constructor(private http: AuthHttp,
                private store: StoreService) {
        super();
    }

    getChannels$(): Observable<Channel[]> {
        if (environment.mock) {
            return of(MOCK_CHANNELS).pipe(delay(1000));
        }
        return this.http
            .get(`${this.store.getSitesUrl()}channels`)
            .map(res => this.extractData<Channel[]>(res));
    }

    getChannelMessages(idSiteCanal: number, answered: boolean, page: number, size: number): Observable<PagedData<Message>> {
        if (environment.mock) {
            const result = new PagedData<Message>();
            result.data = (answered ? MOCK_ANSWERED_MESSAGES : MOCK_UNANSWERED_MESSAGES) as Message[];
            result.page.totalElements = result.data.length;
            result.page.pageNumber = page;
            result.page.size = size;
            result.page.totalPages = result.page.totalElements / size;
            return of(result).pipe(delay(1000));
        }
        return this.http
            .get(`${this.store.getSitesUrl()}channel-sites/${idSiteCanal}/messages?answered=${answered}&page=${page}&size=${size}`)
            .map(res => {
                const response = res.json();
                const result = new PagedData<Message>();
                result.data = response.data.map(message => {
                    let lastInteraction = message.messages[0];
                    const status = lastInteraction.status;
                    const lastQuestion = message.messages.filter(msg => msg.direction === 'in')[0] || null;
                    if (lastQuestion) {
                        const lastAnswer = message.messages.filter(msg => msg.direction === 'out')[0] || null;
                        if (lastAnswer && lastAnswer.created > lastQuestion.created) {
                            lastQuestion.answerText = lastAnswer.text;
                            lastQuestion.answerCreated = lastAnswer.created;
                        }
                        lastInteraction = lastQuestion;
                    }
                    lastInteraction.messages = message.messages;
                    lastInteraction.globalStatus = status;
                    return lastInteraction;
                });
                result.page.totalElements = response.total;
                result.page.pageNumber = page;
                result.page.size = size;
                result.page.totalPages = result.page.totalElements / size;
                return result;
            });
    }

    saveAnswer(id: string, answer: string): Observable<void> {
        if (environment.mock) {
            return of(null).pipe(delay(1000));
        }
        return this.http
            .put(`${this.store.getSitesUrl()}messages/${id}/answer`, { answer })
            .map(() => null);
    }

    getPredefinedAnswers(): Observable<PredefinedAnswer[]> {
        return this.http
            .get(`${this.store.getChmUrl()}predefined-answers`)
            .map(res => this.extractData<PredefinedAnswer[]>(res));
    }

    exportChannelMessages(idSiteCanal: number, answered: boolean, contentType: string): Observable<any> {
        const headers = new Headers();
        headers.append('Accept', contentType);
        const options = new RequestOptions({
            headers,
            responseType: ResponseContentType.Blob
        });
        return this.http
            .get(`${this.store.getSitesUrl()}channel-sites/${idSiteCanal}/messages?answered=${answered}`, options)
            .map(res => res.blob());
    }

    saveNewPredefinedAnswer(newPredefinedAnswerText: string): Observable<PredefinedAnswer> {
        const predefinedAnswer = {
            text: newPredefinedAnswerText
        } as PredefinedAnswer;
        return this.http
            .post(`${this.store.getChmUrl()}predefined-answers`, predefinedAnswer)
            .map(response => {
                const location = response.headers.get('location');
                predefinedAnswer.id = location.substring(location.lastIndexOf('/') + 1);
                return predefinedAnswer;
            });
    }

    removePredefinedAnswer(id: string): Observable<null> {
        return this.http
            .delete(`${this.store.getChmUrl()}predefined-answers/${id}`)
            .map(() => null);
    }

    getOrderByChannelOrderId(orderId: string): Observable<Order> {
        return this.http
            .get(`${this.store.getSitesUrl()}channel-orders/${orderId}`)
            .map(res => this.extractData<Order>(res));
    }
}
