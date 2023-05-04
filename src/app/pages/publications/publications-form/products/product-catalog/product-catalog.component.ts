import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { environment } from 'environments/environment';
import { MOCK_PRODUCTS, MOCK_PRODUCTS_BRANDS, MOCK_PRODUCTS_CATEGORIES } from 'app/pages/publications/shared/mock-data';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from 'app/data/page';
import { PagedData } from 'app/data/paged-data';
import { Observable } from 'rxjs/Observable';
import { AlertDialogComponent } from 'app/util/alert-dialog/alert-dialog.component';
import { TranslateService } from '@ngx-translate/core';

declare var jQuery: any;

@Component({
    selector: 'app-product-catalog',
    templateUrl: './product-catalog.component.html',
    styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

    public onClose: Subject<any>;

    page = new Page();

    products: any[];
    selected = [];
    idsSelected = {};
    idsSelectedSubconjunto = {};
    allSelected = false;
    countSeleccionadosTotal = 0;
    countTotal = 0;
    productCount = 0;

    categoriesAll: any[];
    channelsAll: any[];
    channelsAllNot: any[];
    brandsAll: any[];
    stationsAll: any[];
    rotulosAll: any[];

    isLoading = true;
    isFirstTime = true;

    brandChecks = [];
    categoryChecks = [];
    stationChecks = [];
    rotuloChecks = [];
    channelChecks = [];
    channelNotChecks = [];
    channelsAtLeastOne = false;
    channelsAny = false;
    activeFilterValue = false;
    stockFilterValue = false;
    alphaOrEanOrSkuFilterValue;
    descriptionFilterValue;
    priceMinFilterValue;
    priceMaxFilterValue;
    priceMinFeeFilterValue;
    priceMaxFeeFilterValue;

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private formDataService: FormDataService,
                private modalService: BsModalService,
                private translateService: TranslateService,
                private bsModalRef: BsModalRef) {
    }

    ngOnInit() {
        this.page.pageNumber = 0;
        this.page.size = 50;
        this.onClose = new Subject();
        this._loadData();
    }

    _loadData() {
        this.isLoading = true;

        if (environment.mock) {
            this.categoriesAll = MOCK_PRODUCTS_CATEGORIES;
            this.brandsAll = MOCK_PRODUCTS_BRANDS;

            this.products = MOCK_PRODUCTS;

            this.productCount = this.products.length;

            this._bindProductDatatable();

        } else {
            const productFilter = this.formDataService.getFormData().preloadedFilters;
            if (this.isFirstTime) {
                this.isFirstTime = false;
                const commonFilter = {
                    filterFields: 'active',
                    filterValues: 'true',
                    page: this.page.pageNumber,
                    pageSize: this.page.size
                }

                Observable.forkJoin(
                    this.formDataService.getProductCategories(commonFilter),
                    this.formDataService.getProductBrands(commonFilter),
                    this.formDataService.getProductCount(productFilter),
                    this.formDataService.getProductChannels(commonFilter),
                    this.formDataService.getIdsProducts(productFilter),
                    this.formDataService.getProductStations(commonFilter),
                    this.formDataService.getRotulos(commonFilter)
                ).subscribe(
                    res => {
                        this.categoriesAll = res[0];
                        this.brandsAll = res[1].sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.productCount = res[2];
                        this.channelsAll = res[3];
                        this.channelsAllNot = res[3];
                        this.idsSelectedSubconjunto = {};
                        this.selected = [];
                        res[4].forEach(id => {
                            this.idsSelected[id] = false;
                            this.idsSelectedSubconjunto[id] = false;
                        })
                        this.allSelected = false;
                        this.countSeleccionadosTotal = 0;
                        this.countTotal = res[4].length;
                        this.formDataService.getIdsProductosPublicacion().forEach(idProductosPublicacion => {
                            this.idsSelected[idProductosPublicacion] = true;
                            this.idsSelectedSubconjunto[idProductosPublicacion] = true;
                            this.selected.push(idProductosPublicacion);
                            this.countSeleccionadosTotal++;
                        });
                        if (this.countSeleccionadosTotal == this.countTotal) {
                            this.allSelected = true;
                        }
                        this.stationsAll = res[5];
                        this.rotulosAll = res[6];
                    },
                    err => {
                        console.log('_loadData.Error => ' + JSON.stringify(err));
                    },
                    () => {
                        this._bindProductDatatable();
                    }
                );
            } else {
                Observable.forkJoin(
                    this.formDataService.getProductCount(productFilter),
                    this.formDataService.getIdsProducts(productFilter)
                ).subscribe(
                    res => {
                        this.productCount = res[0];
                        this.idsSelectedSubconjunto = {};
                        res[1].forEach(id => {
                            this.idsSelectedSubconjunto[id] = this.idsSelected[id];
                        });
                        let allSubconjuntoSelected = true;
                        this.selected = [];
                        Object.keys(this.idsSelectedSubconjunto).forEach(id => {
                            if (this.idsSelectedSubconjunto[id] == false) {
                                allSubconjuntoSelected = false;
                            } else {
                                this.selected.push(id);
                            }
                        });
                        let countSeleccionadosTotalAux = 0;
                        Object.keys(this.idsSelected).forEach(id => {
                            if (this.idsSelected[id] == true) {
                                countSeleccionadosTotalAux++;
                            }
                        });
                        this.countSeleccionadosTotal = countSeleccionadosTotalAux;
                        this.allSelected = allSubconjuntoSelected;
                    },
                    err => {
                        console.log('_loadData.Error => ' + JSON.stringify(err));
                    },
                    () => {
                        this._bindProductDatatable();
                    }
                );
            }
        }
    }

    changeRowSelection(idProduct) {

        this.idsSelected[idProduct] = !this.idsSelected[idProduct];
        this.idsSelectedSubconjunto[idProduct] = this.idsSelected[idProduct];

        let allSubconjuntoSelected = true;
        this.selected = [];
        Object.keys(this.idsSelectedSubconjunto).forEach(id => {
            if (this.idsSelectedSubconjunto[id] == false) {
                allSubconjuntoSelected = false;
            } else {
                this.selected.push(id);
            }
        });
        this.allSelected = allSubconjuntoSelected;
        let countSeleccionadosTotalAux = 0;
        Object.keys(this.idsSelected).forEach(id => {
            if (this.idsSelected[id] == true) {
                countSeleccionadosTotalAux++;
            }
        });
        this.countSeleccionadosTotal = countSeleccionadosTotalAux;
    }

    selectAllClicked() {

        if (this.allSelected == false) {

            this.selected = [];
            Object.keys(this.idsSelectedSubconjunto).forEach(id => {
                this.idsSelectedSubconjunto[id] = true;
                this.idsSelected[id] = true;
                this.selected.push(id);
            });
            this.allSelected = true;

        } else {

            this.selected = [];
            Object.keys(this.idsSelectedSubconjunto).forEach(id => {
                this.idsSelectedSubconjunto[id] = false;
                this.idsSelected[id] = false;
            });
            this.allSelected = false;
        }

        let countSeleccionadosTotalAux = 0;
        Object.keys(this.idsSelected).forEach(item => {
            if (this.idsSelected[item] == true) {
                countSeleccionadosTotalAux++;
            }
        });
        this.countSeleccionadosTotal = countSeleccionadosTotalAux;
    }

    private _bindProductDatatable() {
        this.setPage({ offset: 0 });
    }

    // Trigger this for each form value changes
    private _setProductFilterToPreloadedFilters() {
        const filterCategories = this.categoryChecks.filter(check => !!check.check).map(check => check.id);
        const filterChannels = this.channelChecks.filter(check => !!check.check).map(check => check.id);
        const filterChannelsNot = this.channelNotChecks.filter(check => !!check.check).map(check => check.id);
        const filterBrands = this.brandChecks.filter(check => !!check.check).map(check => check.id);
        const filterStations = this.stationChecks.filter(check => !!check.check).map(check => check.id);
        const filterRotulos = this.rotuloChecks.filter(check => !!check.check).map(check => check.id);

        const filterFields = [];
        const filterValues = [];
        if (filterCategories.length) {
            filterFields.push('category');
            filterValues.push(filterCategories.join('|'));
        }

        if (filterStations.length) {
            filterFields.push('station');
            filterValues.push(filterStations.join('|'));
        }

        if (filterRotulos.length) {
            filterFields.push('rotulo');
            filterValues.push(filterRotulos.join('|'));
        }
        if (filterBrands.length) {
            filterFields.push('brand');
            filterValues.push(filterBrands.join('|'));
        }
        if (this.priceMinFilterValue && this.priceMinFilterValue > 0) {
            filterFields.push('price-min');
            filterValues.push(this.priceMinFilterValue);
        }
        if (this.priceMaxFilterValue && this.priceMaxFilterValue > 0) {
            filterFields.push('price-max');
            filterValues.push(this.priceMaxFilterValue);
        }
        if (this.priceMinFeeFilterValue && this.priceMinFeeFilterValue > 0) {
            filterFields.push('price-min-fee');
            filterValues.push(this.priceMinFeeFilterValue);
        }
        if (this.priceMaxFeeFilterValue && this.priceMaxFeeFilterValue > 0) {
            filterFields.push('price-max-fee');
            filterValues.push(this.priceMaxFeeFilterValue);
        }

        if (this.channelsAtLeastOne) {
            filterFields.push('publicated');
            filterValues.push(true);
        } else if (filterChannels.length) {
            filterFields.push('id-channel');
            filterValues.push(filterChannels.join('|'));
        }
        if (this.channelsAny) {
            filterFields.push('publicated');
            filterValues.push(false);
        } else if (filterChannelsNot.length) {
            filterFields.push('id-channel-not');
            filterValues.push(filterChannelsNot.join('|'));
        }

        if (this.activeFilterValue) {
            filterFields.push('active');
            filterValues.push(true);
        }
        if (this.stockFilterValue) {
            filterFields.push('stock-min');
            filterValues.push('1');
        }
        if (this.descriptionFilterValue && this.descriptionFilterValue.length > 0) {
            filterFields.push('description');
            filterValues.push(this.descriptionFilterValue.replace(/,/g, '|'));
        }
        if (this.alphaOrEanOrSkuFilterValue && this.alphaOrEanOrSkuFilterValue.length > 0) {
            filterFields.push('alpha-ean-sku');
            filterValues.push(this.alphaOrEanOrSkuFilterValue.replace(/,/g, '|'));
        }

        this.formDataService.setPreloadedFilters(filterFields.join(','), filterValues.join(','));
    }

    refresh() {
        this.page.pageNumber = 0;
        this.isLoading = true;
        this._setProductFilterToPreloadedFilters();
        this._loadData();
    }

    markAllChecks(event, checks) {
        const checked = event.target.checked;
        checks.forEach(check => check.check = checked);
    }

    checkboxChannelChanged() {
        this.channelsAtLeastOne = this.channelChecks.every(check => !!check.check);
    }

    checkboxChannelNotChanged() {
        this.channelsAny = this.channelNotChecks.every(check => !!check.check);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        ['#priceFilterContainer', '#priceFeeFilterContainer'].forEach(containerId => {
            const container = jQuery(containerId);
            const containerText = container.text().trim().replace(/\s\s+/g, ' ').toLowerCase();
            if (containerText.indexOf(val) === -1) {
                container.hide();
            } else {
                container.show();
            }
        });

        ['#categoriesFilterContainer', '#channelsFilterContainer', '#channelsNotFilterContainer', '#brandsFilterContainer', '#stationsFilterContainer', '#rotulosFilterContainer'].forEach(containerId => {
            jQuery(containerId).find('input:checkbox').each(() => {
                const tLabel = jQuery(this).parent().text().trim().replace(/\s\s+/g, ' ').toLowerCase();
                if (tLabel.indexOf(val) === -1) {
                    jQuery(this).parent().hide();
                } else {
                    jQuery(this).parent().show();
                }
            });
        });
    }

    // Datatable Events
    getId(row) {
        return row.productId;
    }

    setPage(pageInfo) {
        this.isLoading = true;
        this.page.pageNumber = pageInfo.offset;
        const pagedData = new PagedData<any>();
        if (environment.mock) {
            const start = this.page.pageNumber * this.page.size;
            const end = Math.min((start + this.page.size), this.page.totalElements);
            for (let i = start; i < end; i++) {
                const jsonObj = MOCK_PRODUCTS[i];
                pagedData.data.push(jsonObj);
            }
            pagedData.page = this.page;

            this.page = pagedData.page;
            this.products = pagedData.data;
            if (this.products.length == 0) {
                this.productCount = this.products.length;
            }
            this.isLoading = false;
        } else {
            this.page.totalElements = this.productCount;
            this.page.totalPages = this.page.totalElements / this.page.size;

            const preloadedFilters = this.formDataService.getFormData().preloadedFilters;
            const productFilter = {
                filterFields: preloadedFilters ? preloadedFilters.filterFields : '',
                filterValues: preloadedFilters ? preloadedFilters.filterValues : '',
                page: this.page.pageNumber,
                pageSize: this.page.size
            }
            this.formDataService.getProducts(productFilter).subscribe(data => {
                this.products = data;
                pagedData.data = data;
                pagedData.page = this.page;

                this.page = pagedData.page;
                this.products = pagedData.data;
                if (this.products.length == 0) {
                    this.productCount = this.products.length;
                }
                this.isLoading = false;
            });
        }
    }

    // Popup Events
    public ok(): void {
        if (this.countSeleccionadosTotal === 0) {
            this.showAlert('Product Catalog',this.translateService.instant('FILTER.SELECT_ONE_PRODUCT'));
            return;
        }

        const selectedAux = [];
        Object.keys(this.idsSelected).forEach(item => {
            if (this.idsSelected[item] == true) {
                selectedAux.push(item);
            }
        });
        this.formDataService.setIdsProductosPublicacion(selectedAux);
        this.onClose.next({ 'status': 'ok' });
        this.bsModalRef.hide();
    }

    public cancel(): void {
        this.onClose.next({ 'status': 'cancel' });
        this.bsModalRef.hide();
    }

    showAlert(title: string, msg: string) {
        const initialState = { title: title, msg: msg };
        this.modalService.show(AlertDialogComponent, { initialState });
    }

    onAlphaOrEanOrSkuChange() {
        let oldVal = '';
        let newVal = this.alphaOrEanOrSkuFilterValue;
        while (oldVal != newVal) {
            oldVal = newVal;
            newVal = newVal.replace(/\r\n|\r|\n/g, ',');
            newVal = newVal.replace(/ ,/g, ',');
            newVal = newVal.replace(/, /g, ',');
            newVal = newVal.replace(/,,/g, ',');
        }
        this.alphaOrEanOrSkuFilterValue = newVal;
    }

    onAlphaOrEanOrSkuFocusOut() {
        let value = this.alphaOrEanOrSkuFilterValue.trim();
        if (value.length > 0 && value.endsWith(',')) {
            value = value.substring(0, value.length - 1);
        }
        this.alphaOrEanOrSkuFilterValue = value;
    }

    mostrarfiltros() {
        this._setPreloadedFiltersToProductFilters();
        jQuery(".filter-input-container").css("display", "block");
    }

    cerrarfiltros() {
        jQuery(".filter-input-container").css("display", "none");
    }

    mostrarcerrar_filtro(cajafiltro) {
        const $filter = jQuery('#' + cajafiltro + ">div.filter-scroll");
        if ($filter.css("display") == "none") {
            $filter.css("display", "block");
        } else {
            $filter.css("display", "none");
        }
    }

    deleteFilters() {
        const checks = jQuery('.check-filter');
        for (let i = 0; i < checks.length; i++) {
            checks[i].checked = false;
        }

        this.channelsAny = false;
        this.channelsAtLeastOne = false;
        this.brandChecks.forEach(check => check.check = false);
        this.categoryChecks.forEach(check => check.check = false);
        this.stationChecks.forEach(check => check.check = false);
        this.channelChecks.forEach(check => check.check = false);
        this.channelNotChecks.forEach(check => check.check = false);

        this.refresh();
    }

    private _setPreloadedFiltersToProductFilters() {
        const preloadedFilters = this.formDataService.getFormData().preloadedFilters;

        const filterNames = preloadedFilters && preloadedFilters.filterFields ? preloadedFilters.filterFields.split(",") : [];
        const filterValues = preloadedFilters && preloadedFilters.filterValues ? preloadedFilters.filterValues.split(",") : [];

        const filterMap = {};
        for (let i = 0; i < filterNames.length; i++) {
            const filterName = filterNames[i];
            filterMap[filterName] = filterValues[i].split("|");
        }

        const prepareChecks = function (options, idAttr, checks, isChecked) {
            options.forEach(option => {
                const id = option[idAttr];
                let check = checks.find(c => c.id === id);
                if (!check) {
                    check = { id: id, name: option.name };
                    checks.push(check);
                }
                check.check = isChecked(id.toString());
            });
        }

        const activeFilterList = filterMap['active'];
        this.activeFilterValue = activeFilterList && activeFilterList.length > 0 && activeFilterList[0] === 'true';

        const stockFilterList = filterMap['stock-min'];
        this.stockFilterValue = stockFilterList && stockFilterList.length > 0 && stockFilterList[0] === '1';

        const brandFilterList = filterMap['brand'] ? filterMap['brand'] : [];
        prepareChecks(this.brandsAll, 'name', this.brandChecks, id => brandFilterList.indexOf(id) > -1);

        const stationFilterList = filterMap['station'] ? filterMap['station'] : [];
        prepareChecks(this.stationsAll, 'id', this.stationChecks, id => stationFilterList.indexOf(id) > -1);

        const rotuloFilterList = filterMap['rotulo'] ? filterMap['rotulo'] : [];
        prepareChecks(this.rotulosAll, 'id', this.rotuloChecks, id => rotuloFilterList.indexOf(id) > -1);

        const categoryFilterList = filterMap['category'] ? filterMap['category'] : [];
        prepareChecks(this.categoriesAll, 'id', this.categoryChecks, id => categoryFilterList.indexOf(id) > -1);

        this.channelsAtLeastOne = filterMap['publicated'] && filterMap['publicated'].length > 0 && filterMap['publicated'][0] === 'true';
        const channelFilterList = filterMap['id-channel'] ? filterMap['id-channel'] : [];
        prepareChecks(this.channelsAll, 'idSiteCanal', this.channelChecks, id => this.channelsAtLeastOne || channelFilterList.indexOf(id) > -1);

        this.channelsAny = filterMap['publicated'] && filterMap['publicated'].length > 0 && filterMap['publicated'][0] === 'false';
        const channelNotFilterList = filterMap['id-channel-not'] ? filterMap['id-channel-not'] : [];
        prepareChecks(this.channelsAllNot, 'idSiteCanal', this.channelNotChecks, id => this.channelsAny || channelNotFilterList.indexOf(id) > -1);

        const priceMinFilterList = filterMap['price-min'];
        this.priceMinFilterValue = priceMinFilterList && priceMinFilterList.length > 0 ? priceMinFilterList[0] : null;

        const priceMaxFilterList = filterMap['price-max'];
        this.priceMaxFilterValue = priceMaxFilterList && priceMaxFilterList.length > 0 ? priceMaxFilterList[0] : null;

        const priceMinFeeFilterList = filterMap['price-min-fee'];
        this.priceMinFeeFilterValue = priceMinFeeFilterList && priceMinFeeFilterList.length > 0 ? priceMinFeeFilterList[0] : null;

        const priceMaxFeeFilterList = filterMap['price-max-fee'];
        this.priceMaxFeeFilterValue = priceMaxFeeFilterList && priceMaxFeeFilterList.length > 0 ? priceMaxFeeFilterList[0] : null;

        const alphaOrEanOrSkuFilterList = filterMap['alpha-ean-sku'] ? filterMap['alpha-ean-sku'] : [];
        this.alphaOrEanOrSkuFilterValue = alphaOrEanOrSkuFilterList.join(',');

        const descriptionFilterList = filterMap['description'] ? filterMap['description'] : [];
        this.descriptionFilterValue = descriptionFilterList.join(',');
    }
}
