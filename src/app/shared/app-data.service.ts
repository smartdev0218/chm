import { Injectable } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Injectable()
export class AppDataService {
    private data;

    constructor() {
        console.log('AppDataService Init');
    }

    setData(data) {
        this.data = cloneDeep(data);
    }

    getData() {
        return this.data;
    }
}
