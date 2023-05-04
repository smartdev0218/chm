import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { Message } from '../model/message.model';
import { Channel } from '../model/channel.model';
import { MessengerService } from '../shared/messenger.service';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PredefinedAnswer } from '../model/predefined-answer.model';
import { ConfirmationDialogComponent } from '../../../util/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '../../../services/translate.service';


@Component({
    selector: 'app-messenger-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.css']
})
export class MessengerReplyComponent implements OnInit {

    message: Message;
    channel: Channel;
    answer: string;
    historyMessages: Message[];
    predefinedAnswers: PredefinedAnswer[];
    selectedPredefinedAnswers: PredefinedAnswer;
    isSaving = false;
    insertNewPredefinedAnswer = false;
    newPredefinedAnswer: string;
    isSavingPredefinedAnswer = false;
    isLoadingPredefinedAnswers = false;
    onClose: Subject<boolean>;

    constructor(private bsModalRef: BsModalRef,
                private bsModalService: BsModalService,
                private appDataService: AppDataService,
                private messengerService: MessengerService,
                private translateService: TranslateService) {
        const data = appDataService.getData();

        const input = data.input;
        this.message = input.message;
        this.channel = input.channel;
    }

    ngOnInit(): void {
        this.onClose = new Subject<boolean>();
        this.isLoadingPredefinedAnswers = true;
        this.messengerService.getPredefinedAnswers().pipe(
            finalize(() => this.isLoadingPredefinedAnswers = false)
        ).subscribe(answers => this.predefinedAnswers = answers);
        if (this.message.answerText) {
            this.answer = this.message.answerText;
        }
        this.historyMessages = this.message.messages.filter(msg => msg.status != 'ERROR').reverse();
    }

    closeMe(): void {
        this._close(false);
    }

    submitAnswer(): void {
        this.isSaving = true;
        this.messengerService.saveAnswer(this.message.id, this.answer).pipe(
            finalize(() => this.isSaving = false)
        ).subscribe(() => this._close(true),
            err => console.log('submitAnswer.Error => ' + JSON.stringify(err)));
    }

    setAnswer(predefinedAnswer: PredefinedAnswer): void {
        this.answer = predefinedAnswer.text;
        this.selectedPredefinedAnswers = predefinedAnswer;
    }

    addNewPredefinedAnswer() {
        this.newPredefinedAnswer = null;
        this.insertNewPredefinedAnswer = true;
    }

    closeNewPredefinedAnswer() {
        this.insertNewPredefinedAnswer = false;
    }

    saveNewPredefinedAnswer() {
        this.isSavingPredefinedAnswer = true;
        this.messengerService.saveNewPredefinedAnswer(this.newPredefinedAnswer).pipe(
            finalize(() => this.isSavingPredefinedAnswer = false)
        ).subscribe(predefinedAnswer => {
                this.predefinedAnswers.push(predefinedAnswer);
                this.insertNewPredefinedAnswer = false;
                console.log('saveNewPredefinedAnswer => ' + JSON.stringify(predefinedAnswer));
            },
            err => console.log('saveNewPredefinedAnswer.Error => ' + JSON.stringify(err)));
    }

    removePredefinedAnswer() {
        if (this.selectedPredefinedAnswers) {
            const initialState = {
                title: this.translateService.getTranslate().instant('MESSENGER.CONFIRM_REMOVE_PREDEFINED_ANSWER'),
                msg: this.selectedPredefinedAnswers.text
            };
            const confirmationModal = this.bsModalService.show(ConfirmationDialogComponent, { initialState });
            (<ConfirmationDialogComponent>confirmationModal.content).onClose.subscribe(result => {
                if (result.status === 'ok') {
                    const predefinedAnswerIdToRemove = this.selectedPredefinedAnswers.id;
                    this.isLoadingPredefinedAnswers = true;
                    this.messengerService.removePredefinedAnswer(predefinedAnswerIdToRemove).pipe(
                        finalize(() => this.isLoadingPredefinedAnswers = false)
                    ).subscribe(() => {
                        this.predefinedAnswers = this.predefinedAnswers.filter(predefinedAnswer => predefinedAnswerIdToRemove !== predefinedAnswer.id);
                        this.selectedPredefinedAnswers = null;
                    });
                }
            });
        }
    }

    private _close(result: boolean): void {
        this.onClose.next(result);
        this.bsModalRef.hide();
    }
}
