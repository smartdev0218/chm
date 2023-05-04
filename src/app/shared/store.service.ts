import { Injectable, EventEmitter, isDevMode } from '@angular/core';

@Injectable()
export class StoreService {
    public siteChanged$: EventEmitter<number>;
    private _site: { id: number, name: string };
    private _channel: { id: number, name: string };
    private _presetType: string;

    constructor() {
        this.siteChanged$ = new EventEmitter();
    }

    getSite() { return this._site; }
    setSite(site: { id: number, name: string }) {
        this._site = site;
        this.siteChanged$.emit(site.id);
    }
    getSitesUrl() {
        if (isDevMode()) {
            return this._site ? `/chm/backend/sites/${this._site.id}/` : '/chm/backend/sites/';
        } else {
            return this._site ? `/chm/sites/${this._site.id}/` : '/chm/sites/';
        }
    }
    getChmUrl() {
        if (isDevMode()) {
            return '/chm/backend/';
        } else {
            return '/chm/';
        }
    }

    getMenuUrl(){
        if (isDevMode()) {
            return '/chm/backend/menu';
        } else {
            return '/chm/menu';
        }
    }

    getChannel() { return this._channel; }
    setChannel(channel: any) { this._channel = channel; }

    getPresetType() { return this._presetType; }
    setPresetType(type: string) { this._presetType = type; }
}
