import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MercadoLibreSettings } from './model/mercado-libre-settings.model';

@Component({
    selector: 'app-mercado-libre-settings',
    templateUrl: './mercado-libre-settings.component.html',
    styleUrls: ['./mercado-libre-settings.component.css']
})
export class MercadoLibreSettingsComponent implements OnInit {

    @Input()
    model: any;
    @Output()
    modelChange = new EventEmitter<any>();
    @Output()
    validChange = new EventEmitter<boolean>();
    settings = {} as MercadoLibreSettings;
    listingTypes: string[];
    shippingTypes: string[];
    invalidFields = {};

    ngOnInit(): void {
        let listingTypeAttr = this.getAttribute('LISTING_TYPE');
        let shippingTypeAttr = this.getAttribute('SHIPPING_TYPE');
        this.listingTypes = listingTypeAttr.idAttributeModelChannel.acceptedValues;
        this.shippingTypes = shippingTypeAttr.idAttributeModelChannel.acceptedValues;
        this.settings = {
            listingType: listingTypeAttr.attributeValue ? listingTypeAttr.attributeValue : 'gold',
            shippingType: shippingTypeAttr.attributeValue ? shippingTypeAttr.attributeValue : 'me2',
            fragileShipping: this.getAttributeBooleanValue('FRAGILE_SHIPPING'),
            discountLowLevels: this.getAttributeNumberValue('DISCOUNT_LOW_LEVELS'),
            discountHighLevels: this.getAttributeNumberValue('DISCOUNT_HIGH_LEVELS'),
            discountStartDate: this.getAttributeDateValue('DISCOUNT_START_DATE'),
            discountEndDate: this.getAttributeDateValue('DISCOUNT_END_DATE')
        } as MercadoLibreSettings;
        this.settings.discountsEnabled = !!this.settings.discountLowLevels;
        this.validate();
    }

    validateAndEmitChanges(): void {
        if (this.validate()) {
            this.getAttribute('LISTING_TYPE').attributeValue = this.settings.listingType;
            this.getAttribute('SHIPPING_TYPE').attributeValue = this.settings.shippingType;
            this.getAttribute('FRAGILE_SHIPPING').attributeValue = !!this.settings.fragileShipping;
            this.setDiscountAttribute('DISCOUNT_LOW_LEVELS', this.settings.discountLowLevels);
            this.setDiscountAttribute('DISCOUNT_HIGH_LEVELS', this.settings.discountHighLevels);
            this.setDiscountAttribute('DISCOUNT_START_DATE', this.settings.discountStartDate);
            this.setDiscountAttribute('DISCOUNT_END_DATE', this.settings.discountEndDate);
            this.modelChange.emit(this.model);
        }
    }

    private getAttribute(attributeName: string): any {
        return this.model.modelAttributes.filter(function (attr) {
            return attr.idAttributeModelChannel.attributeName === attributeName;
        })[0] || null;
    }

    private getAttributeNumberValue(attributeName: string): number {
        const attribute = this.getAttribute(attributeName);
        if (attribute && attribute.attributeValue && !isNaN(attribute.attributeValue)) {
            return Number(attribute.attributeValue);
        }
        return null;
    }

    private getAttributeBooleanValue(attributeName: string): boolean {
        const attribute = this.getAttribute(attributeName);
        return attribute && !!attribute.attributeValue;
    }

    private getAttributeDateValue(attributeName: string): Date {
        const attribute = this.getAttribute(attributeName);
        if (attribute && attribute.attributeValue) {
            const date = new Date(attribute.attributeValue);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return null;
    }

    private setDiscountAttribute(attributeName: string, value: any) {
        const attribute = this.getAttribute(attributeName);
        if (attribute) {
            attribute.attributeValue = this.settings.discountsEnabled ? value : null;
        }
    }

    private validate(): boolean {
        let valid = this.validateRequired('shippingType');
        valid = this.validateRequired('listingType') && valid;
        valid = this.validateDiscounts() && valid;
        this.validChange.emit(valid);
        return valid;
    }

    private validateRequired(field: string): boolean {
        const valid = !!this.settings[field];
        this.invalidFields[field] = !valid;
        return valid;
    }

    private validateDiscounts(): boolean {
        const invalidFields = this.invalidFields;
        if (!this.settings.discountsEnabled) {
            invalidFields['discountLowLevels'] = false;
            invalidFields['discountHighLevels'] = false;
            invalidFields['discountStartDate'] = false;
            invalidFields['discountEndDate'] = false;
            return true;
        }
        let valid = this.validateDiscountPercentages();
        valid = this.validateDiscountDates() && valid;
        return valid;
    }

    private validateDiscountPercentages(): boolean {
        let valid = this.validateDiscountPercentage('discountLowLevels');
        valid = this.validateDiscountPercentage('discountHighLevels') && valid;
        return valid ? this.validateDiscountsDifference() : false;
    }

    private validateDiscountPercentage(field: string): boolean {
        const value = this.settings[field];
        const valid = !!value && !isNaN(value) && Number(value) >= 5 && Number(value) <= 80;
        this.invalidFields[field] = !valid;
        return valid;
    }

    private validateDiscountsDifference(): boolean {
        const value = this.settings.discountLowLevels;
        const maxValue = this.settings.discountHighLevels - (value <= 35 ? 5 : 10);
        const valid = value <= maxValue;
        this.invalidFields['discountLowLevels'] = !valid;
        return valid;
    }

    private validateDiscountDates(): boolean {
        let valid = this.validateRequired('discountStartDate');
        valid = this.validateRequired('discountEndDate') && valid;
        return valid ? this.validateDiscountDatesDifference() : false;
    }

    private validateDiscountDatesDifference(): boolean {
        const from = new Date(this.settings.discountStartDate);
        from.setMinutes(from.getMinutes() - from.getTimezoneOffset());
        const to = new Date(this.settings.discountEndDate);
        to.setMinutes(to.getMinutes() - to.getTimezoneOffset());
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const days = (to.getTime() - from.getTime()) / millisecondsPerDay;
        const valid = days <= 7 && days > 0;
        this.invalidFields['discountEndDate'] = !valid;
        return valid;
    }
}
