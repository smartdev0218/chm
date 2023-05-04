export interface MercadoLibreSettings {
    listingType: string;
    shippingType: string;
    discountsEnabled: boolean;
    discountLowLevels: number;
    discountHighLevels: number;
    discountStartDate: Date;
    discountEndDate: Date;
    fragileShipping: boolean;
}
