import { isDevMode } from '@angular/core';

export class ApiConfig {
    public static get base(): string { return (isDevMode()) ? '/chm/backend/' : '/chm/'; }
    public static get sites(): string { return this.base + 'sites/'; }
    public static get channels(): string { return 'channels/'; }
    public static get filters(): string { return 'filters/'; }
    public static get constants(): Object {
        return {
            base: 'constants/',
            fields: this.base + 'inventory-fields/',
            ops: this.base + 'filter-operators'
        };
    }
    public static get presets(): Object {
        return {
            base: 'presets/',
            desc: this.base + 'description/',
            price: this.base + 'price/',
            payment: this.base + 'payment/',
            shipping: this.base + 'shipping/',
            stock: this.base + 'stock/'
        };
    }
    public static get inventory(): string { return 'inventory/'; }
    public static get dashboard(): string { return 'dashboard/'; }
    public static get reports(): string { return 'reports/'; }
}
