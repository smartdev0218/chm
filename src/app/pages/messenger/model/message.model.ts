export interface Message {
    id: string;
    idSiteCanal: number;
    sellerId: number;
    messageKey: string;
    messageId: string;
    fromId: number;
    itemId: string;
    status: string;
    messageType: string;
    direction: string;
    fromName: string;
    text: string;
    answerText: string;
    created: number;
    answerCreated: number;
    messages: Message[];
    globalStatus: string;
}
