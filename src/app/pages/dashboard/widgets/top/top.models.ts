export class TopConfig {
    id: number;
    name: string;
}

export class TopSell {
    channelId: number;
    channelName: string;
    numSells: string;
    interval: Interval;
}

export interface Interval {
    id: number;
    name: string;
}