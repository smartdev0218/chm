import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { StoreService } from 'app/shared/store.service';
import { InventoryService } from 'app/pages/inventory/shared/inventory.service';
// import { FormDataService } from 'app/pages/publications/publications-form/data/formData.service';
import { environment } from 'environments/environment';
import { MOCK_PRODUCTS, MOCK_PRODUCTS_CATEGORIES, MOCK_PRODUCTS_BRANDS, MOCK_PRODUCTS_COUNT, MOCK_CHANNELS } from 'app/pages/inventory/shared/mock-data';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Page } from 'app/data/page';
import { PagedData } from 'app/data/paged-data';
import { Observable } from 'rxjs/Observable';

import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppDataService } from 'app/shared/app-data.service';
import { ProductDetailComponent } from 'app/pages/inventory/product-detail/product-detail.component';
import { TranslateService } from 'app/services/translate.service';
import { ExportFileService } from 'app/services/export-file.service';

declare var jQuery: any;


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  showDashboard = false;

  public onClose: Subject<any>;
  bsModalRef: BsModalRef;
  // Pagination
  totalProducts = [];
  page = new Page();
  productFilter: any = {};
  private models: any[] = [];
  private inventoryExportResults: any[] = [];
  debug: false;
  products: any[];
  selected = [];

  productCount = 0;
  catalogsAll: any[];
  tempCatalogsAll: any[];
  channelsAll: any[];
  channelsAllNot: any[];

  brandsAll: any[];
  stationsAll: any[];
  rotulosAll: any[];
  isLoading = true;

  myWindow;
  message;

  isFirstTime = true;

  selectedFiltersCategories = []
  selectedFiltersRotulos = []
  selectedFiltersStations = []
  selectedFiltersBrands = []
  selectedFiltersChannelNotIn = []
  selectedFiltersChannelIn = []
  selectedFiltersError = []
  selectedFilterActive = []



  filterForm: FormGroup;
  private filterFormSubscr: Subscription;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private storeSrv: StoreService, private breadServ: BreadcrumbService
    , private inventoryService: InventoryService
    // , private formDataService: FormDataService
    , private appDataService: AppDataService
    , private modalService: BsModalService
    , private ProductDetailComponent: ProductDetailComponent
    , private fb: FormBuilder
    , private translate: TranslateService
    , private cdr: ChangeDetectorRef
    , private exportFileService: ExportFileService
  ) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {

    // setttings the header for the home
    this.breadServ.setCurrent({
      description: '',
      display: true,
      header: 'HEADER.INVENTORY',

    });

    if (this.storeSrv.getSite()) {
      this.showDashboard = true;
    }
    // _init
    this._init();
    // _loadData
    this._loadData();

  }

  _init() {
    this.page.pageNumber = 0;
    this.page.size = 50;
    this.onClose = new Subject();

    this.productFilter = {
      filterFields: '',
      filterValues: '',
      page: this.page.pageNumber,
      pageSize: this.page.size
    };

    // Form Group for a Hero Form
    this.filterForm = this.fb.group({
      catalogs: this.fb.array([]),
      stations: this.fb.array([]),
      rotulos: this.fb.array([]),
      brands: this.fb.array([]),
      channels: this.fb.array([]),
      channelsAtLeastOne: false,
      channelsAnyError: false,
      activeProducts: false,
      channelsAny: false,
      channelsNot: this.fb.array([]),
      priceMin: 0,
      priceMax: 0,
      priceMinFee: 0,
      priceMaxFee: 0,
      stockMin: 0,
      alpha: '',
      ean: '',
      description: '',
      alphaOrEanOrSku: ''
    });

    this.selectedFiltersCategories = []
    this.selectedFiltersRotulos = []
    this.selectedFiltersStations = []
    this.selectedFiltersBrands = []
    this.selectedFiltersChannelNotIn = []
    this.selectedFiltersChannelIn = []
    this.selectedFiltersError = []
    this.selectedFilterActive = []

    var checks = jQuery('.check-filter');

    for (let i = 0; i < checks.length; i++) {
      checks[i].checked = false;
    }
  }

  onSiteChanged(id: number) {
    this.showDashboard = true;
  }

  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }

  _loadData() {
    this.isLoading = true;

    if (environment.mock) {
      this.catalogsAll = MOCK_PRODUCTS_CATEGORIES;
      this.tempCatalogsAll = MOCK_PRODUCTS_CATEGORIES;
      this.brandsAll = MOCK_PRODUCTS_BRANDS;
      this.channelsAll = MOCK_CHANNELS;
      this.channelsAllNot = MOCK_CHANNELS;
      // mock pagination
      this.totalProducts = MOCK_PRODUCTS;
      this.products = MOCK_PRODUCTS;
      // this.temp = MOCK_PRODUCTS;
      this.productCount = this.products.length;

      this.isLoading = false;

      // bind form & datatable
      this._bindProductFilterForm();
      this._bindProductDatatable();

    } else {
      if (this.isFirstTime) {
        Observable.forkJoin(
          this.inventoryService.getProductCategories(this.productFilter),
          this.inventoryService.getProductBrands(this.productFilter),
          this.inventoryService.getProductCount(this.productFilter),
          this.inventoryService.getProductChannels(this.productFilter),
          this.inventoryService.getProductStations(this.productFilter),
          this.inventoryService.getRotulos(this.productFilter)

        ).subscribe(
          res => {
            this.catalogsAll = res[0];
            this.tempCatalogsAll = res[0];
            //ordenar marcas alfabeticamente
            res[1].sort((a, b) => (a.name > b.name) ? 1 : -1)
            this.brandsAll = res[1];
            this.productCount = res[2];
            this.channelsAll = res[3];
            this.channelsAllNot = res[3];
            this.stationsAll = res[4];
            this.rotulosAll = res[5];
          },
          err => {
            console.log('_loadData.Error => ' + JSON.stringify(err));
          },
          () => {
            // bind form & datatable
            this._bindProductFilterForm();
            this._bindProductDatatable();

            // subscribe form change event
            if (this.filterFormSubscr) {
              this.filterFormSubscr.unsubscribe();
            }
            this.isLoading = false;
          }

        );
        this.isFirstTime = false;
      } else {
        Observable.forkJoin(
          this.inventoryService.getProductCount(this.productFilter)
        ).subscribe(
          res => {
            this.productCount = res[0];
          },
          err => {
            console.log('_loadData.Error => ' + JSON.stringify(err));
          },
          () => {
            // bind form & datatable
            this._bindProductFilterForm();
            this._bindProductDatatable();

            // subscribe form change event
            if (this.filterFormSubscr) {
              this.filterFormSubscr.unsubscribe();
            }
            this.isLoading = false;
          }

        );
      }
    }
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    const pagedData = new PagedData<any>();
    if (environment.mock) {
      const start = this.page.pageNumber * this.page.size;
      const end = Math.min((start + this.page.size), this.page.totalElements);
      for (let i = start; i < end; i++) {
        const jsonObj = this.totalProducts[i];
        pagedData.data.push(jsonObj);
      }
      pagedData.page = this.page;

      this.page = pagedData.page;
      this.products = pagedData.data;
      if (this.products.length == 0) {
        this.productCount = this.products.length;
      }
    } else {
      this.page.totalElements = this.productCount;
      this.page.totalPages = this.page.totalElements / this.page.size;

      this.productFilter.page = this.page.pageNumber;
      this.productFilter.pageSize = this.page.size;

      this.inventoryService.getProducts(this.productFilter).subscribe(data => {
        this.products = data;
        pagedData.data = data;
        pagedData.page = this.page;

        this.page = pagedData.page;
        this.products = pagedData.data;
        if (this.products.length == 0) {
          this.productCount = this.products.length;
        }

      });

    }
  }

  private _bindProductDatatable() {
    if (environment.mock) {
      this.isLoading = false;
      this.page.totalElements = this.productCount;
      this.page.totalPages = this.page.totalElements / this.page.size;
      this.setPage({ offset: 0 });
    } else {
      this.page.totalElements = this.productCount;
      this.page.totalPages = this.page.totalElements / this.page.size;
      this.setPage({ offset: 0 });
    }
    this.isLoading = false;
  }

  private _bindProductFilterForm() {
    const tFilterform = this.filterForm.value;

    // catalogs form binding
    // One Form Group for one Catalog
    const catalogsFGs = this.catalogsAll.map(catalog => {
      const obj = {};
      obj[catalog.id] = false;

      tFilterform.catalogs.filter(item => {
        const keys = Object.keys(item);
        if (keys && parseInt(keys[0]) === catalog.id) {
          // console.log('catalogsFGs=>=>=> ' + JSON.stringify(item) + ', ' + JSON.stringify(keys) + ', ' + keys[0] + ', ' + item[keys[0]]);
          obj[catalog.id] = item[keys[0]];
          return true;
        }
        return false;
      });

      return this.fb.group(obj);
    });
    const catalogFormArray = this.fb.array(catalogsFGs);
    this.filterForm.setControl('catalogs', catalogFormArray);

    // brands form binding
    // One Form Group for one brand
    const brandsFGs = this.brandsAll.map(brand => {
      const obj = {};
      obj[brand.name] = false;
      tFilterform.brands.filter(item => {
        const keys = Object.keys(item);
        if (keys && keys[0] === brand.name) {

          obj[brand.name] = item[keys[0]];
          return true;
        }
        return false;
      });
      return this.fb.group(obj);
    });
    const brandsFormArray = this.fb.array(brandsFGs);
    this.filterForm.setControl('brands', brandsFormArray);

    // Channels form binding
    // One Form Group for one channel
    const channelsFGs = this.channelsAll.map(channel => {
      const obj = {};
      obj[channel.channelId] = false;
      tFilterform.channels.filter(item => {
        const keys = Object.keys(item);
        if (keys && parseInt(keys[0]) === channel.channelId) {
          obj[channel.channelId] = item[keys[0]]
          return true;
        }
        return false;
      });
      return this.fb.group(obj);
    });
    const channelsFormArray = this.fb.array(channelsFGs);
    this.filterForm.setControl('channels', channelsFormArray);

    const channelsNotFGs = this.channelsAllNot.map(channelNot => {
      const obj = {};
      obj[channelNot.channelId] = false;
      tFilterform.channelsNot.filter(item => {
        const keys = Object.keys(item);
        if (keys && parseInt(keys[0]) === channelNot.channelId) {
          obj[channelNot.channelId] = item[keys[0]]
          return true;
        }
        return false;
      });
      return this.fb.group(obj);
    });
    const channelsNotFormArray = this.fb.array(channelsNotFGs);
    this.filterForm.setControl('channelsNot', channelsNotFormArray);


    const stationsFGs = this.stationsAll.map(station => {
      const obj = {};
      obj[station.id] = false;

      tFilterform.stations.filter(item => {
        const keys = Object.keys(item);
        if (keys && parseInt(keys[0]) === station.id) {
          obj[station.id] = item[keys[0]];
          return true;
        }
        return false;
      });

      return this.fb.group(obj);
    });
    const stationFormArray = this.fb.array(stationsFGs);
    this.filterForm.setControl('stations', stationFormArray);


    const rotulosFGs = this.rotulosAll.map(rotulo => {
      const obj = {};
      obj[rotulo.id] = false;

      tFilterform.rotulos.filter(item => {
        const keys = Object.keys(item);
        if (keys && parseInt(keys[0]) === rotulo.id) {
          obj[rotulo.id] = item[keys[0]];
          return true;
        }
        return false;
      });

      return this.fb.group(obj);
    });
    const rotuloFormArray = this.fb.array(rotulosFGs);
    this.filterForm.setControl('rotulos', rotuloFormArray);


  }

  private _setProductFilter() {
    const filterFormData = this.filterForm.value;
    const tCatalogs = [];
    for (const catalog of filterFormData.catalogs) {
      for (const key in catalog) {
        if (catalog[key] === true) {
          tCatalogs.push(key);
        }
      }
    }

    const tStations = [];
    for (const station of filterFormData.stations) {
      for (const key in station) {
        if (station[key] === true) {
          tStations.push(key);
        }
      }
    }

    const tRotulos = [];
    for (const rotulo of filterFormData.rotulos) {
      for (const key in rotulo) {
        if (rotulo[key] === true) {
          tRotulos.push(key);
        }
      }
    }

    const tBrands = [];
    for (const brand of filterFormData.brands) {
      for (const key in brand) {
        if (brand[key] === true) {
          tBrands.push(key);
        }
      }
    }

    const tChannels = [];
    for (const channel of filterFormData.channels) {
      for (const key in channel) {
        if (channel[key] === true) {
          tChannels.push(key);
        }
      }
    }

    const tChannelsNot = [];
    for (const channelNot of filterFormData.channelsNot) {
      for (const key in channelNot) {
        if (channelNot[key] === true) {
          tChannelsNot.push(key);
        }
      }
    }


    const filterFields = [];
    const filterValues = [];
    if (tCatalogs.length) {
      filterFields.push('category');
      filterValues.push(tCatalogs.join('|'));
    }
    if (tStations.length) {
      filterFields.push('station');
      filterValues.push(tStations.join('|'));
    }
    if (tRotulos.length) {
      filterFields.push('rotulo');
      filterValues.push(tRotulos.join('|'));
    }
    if (tBrands.length) {
      filterFields.push('brand');
      filterValues.push(tBrands.join('|'));
    }
    if (filterFormData.priceMin !== 0) {
      filterFields.push('price-min');
      filterValues.push(filterFormData.priceMin);
    }
    if (filterFormData.priceMax !== 0) {
      filterFields.push('price-max');
      filterValues.push(filterFormData.priceMax);
    }

    if (filterFormData.priceMinFee !== 0) {
      filterFields.push('price-min-fee');
      filterValues.push(filterFormData.priceMinFee);
    }

    if (filterFormData.priceMaxFee !== 0) {
      filterFields.push('price-max-fee');
      filterValues.push(filterFormData.priceMaxFee);
    }


    if (filterFormData.stockMin !== 0) {
      filterFields.push('stock-min');
      filterValues.push(filterFormData.stockMin);
    }
    if (filterFormData.channelsAtLeastOne) {
      filterFields.push('publicated');
      filterValues.push(true);
    } else {
      if (tChannels.length) {
        filterFields.push('id-channel');
        filterValues.push(tChannels.join('|'));
      }
    }
    if (filterFormData.channelsAny) {
      filterFields.push('publicated');
      filterValues.push(false);
    } else {
      if (tChannelsNot.length) {
        filterFields.push('id-channel-not');
        filterValues.push(tChannelsNot.join('|'));
      }
    }
    if (filterFormData.channelsAnyError) {
      filterFields.push('anyError');
      filterValues.push(true);
    }
    if (filterFormData.activeProducts) {
      filterFields.push('active');
      filterValues.push(true);
    }
    if (filterFormData.alpha.length > 0) {
      filterFields.push('alpha');
      filterValues.push(filterFormData.alpha);
    }
    if (filterFormData.ean.length > 0) {
      filterFields.push('ean');
      filterValues.push(filterFormData.ean);
    }
    if (filterFormData.description.length > 0) {
      filterFields.push('description');
      filterValues.push(filterFormData.description);
    }
    if (filterFormData.alphaOrEanOrSku.length > 0) {
      filterFields.push('alpha-ean-sku');
      filterValues.push(filterFormData.alphaOrEanOrSku.replace(/,/g, '|'));
    }


    this.productFilter = {
      filterFields: filterFields.join(','),
      filterValues: filterValues.join(','),
      page: this.page.pageNumber,
      pageSize: this.page.size
    };
  }

  refresh() {
    this.page.pageNumber = 0;
    this.isLoading = true;
    this._setProductFilter();
    this._loadData();
  }


  //CAMBIAR para reinicializar el formulario y no refrescar la pagina
  deleteFilters() {
    this.productFilter = {
      filterFields: '',
      filterValues: '',
      page: this.page.pageNumber,
      pageSize: this.page.size
    };

    // Form Group for a Hero Form
    this.filterForm = this.fb.group({
      catalogs: this.fb.array([]),
      brands: this.fb.array([]),
      stations: this.fb.array([]),
      rotulos: this.fb.array([]),
      channels: this.fb.array([]),
      channelsAtLeastOne: false,
      channelsAnyError: false,
      channelsAny: false,
      channelsNot: this.fb.array([]),
      priceMin: 0,
      priceMax: 0,
      priceMinFee: 0,
      priceMaxFee: 0,
      stockMin: 0,
      alpha: '',
      ean: '',
      description: '',
      alphaOrEanOrSku: '',
      activeProducts: false
    });

    this.selectedFiltersCategories = []
    this.selectedFiltersRotulos = []
    this.selectedFiltersStations = []
    this.selectedFiltersBrands = []
    this.selectedFiltersChannelNotIn = []
    this.selectedFiltersChannelIn = []
    this.selectedFiltersError = []
    this.selectedFilterActive = []

    var checks = jQuery('.check-filter');

    for (let i = 0; i < checks.length; i++) {
      checks[i].checked = false;
    }

  }

  checkboxAtLeastOneChannelChanged(event) {

    for (const channel of this.filterForm.value.channels) {
      for (const key in channel) {
        channel[key] = event.target.checked;
      }
    }

    for (let i = 0; i < this.channelsAll.length; i++) {
      this.modifyList(this.channelsAll[i], 'channelIn', i)
    }
    this._bindProductFilterForm();
  }

  checkboxAllBrands(event) {
    for(const brand of this.filterForm.value.brands){
      for(const key in brand){
        brand[key]= event.target.checked;
      }
    }

    for (let i = 0; i < this.brandsAll.length; i++) {
      this.modifyList(this.brandsAll[i], 'brand', i)
    }
    this._bindProductFilterForm();
  }



  checkboxAllCatalogs(event) {
    for(const catalog of this.filterForm.value.catalogs){
      for(const key in catalog){
        catalog[key]= event.target.checked;
      }
    }

    for (let i = 0; i < this.catalogsAll.length; i++) {
      this.modifyList(this.catalogsAll[i], 'category', i)
    }
    this._bindProductFilterForm();
  }

  checkboxChannelChanged(event, element, filtername, index) {

    var allChecked = true;
    for (const channel of this.filterForm.value.channels) {
      for (const key in channel) {
        if (channel[key] != true) {
          allChecked = false;
        }
      }
    }
    this.filterForm.value.channelsAtLeastOne = allChecked;
    this.filterForm.patchValue({ channelsAtLeastOne: allChecked });
    this.modifyList(element, filtername, index)
    this._bindProductFilterForm();
  }

  checkboxChannelNotChanged(event, element, filtername, index) {
    var allChecked = true;
    for (const channelNot of this.filterForm.value.channelsNot) {
      for (const key in channelNot) {
        if (channelNot[key] != true) {
          allChecked = false;
        }
      }
    }
    this.filterForm.value.channelsAny = allChecked;
    this.filterForm.patchValue({ channelsAny: allChecked });
    this.modifyList(element, filtername, index)
    this._bindProductFilterForm();
  }

  checkboxAnyChanged(event) {
    for (const channelNot of this.filterForm.value.channelsNot) {
      for (const key in channelNot) {
        channelNot[key] = event.target.checked;
      }
    }

    for (let i = 0; i < this.channelsAllNot.length; i++) {
      this.modifyList(this.channelsAllNot[i], 'channelNotIn', i)
    }
    this._bindProductFilterForm();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter stock label
    const stockDiv = jQuery('#stockDiv').text().trim().replace(/\s\s+/g, ' ').toLowerCase();
    if (stockDiv.indexOf(val) === -1) {
      jQuery('#stockDiv').hide();
    } else {
      jQuery('#stockDiv').show();
    }

    // filter price lable
    const priceDiv = jQuery('#priceDiv').text().trim().replace(/\s\s+/g, ' ').toLowerCase();
    if (priceDiv.indexOf(val) === -1) {
      jQuery('#priceDiv').hide();
    } else {
      jQuery('#priceDiv').show();
    }

    // filter catalog
    jQuery('#catalogDiv').find('input:checkbox').each(function () {
      const tLabel = jQuery(this).parent().text().trim().replace(/\s\s+/g, ' ').toLowerCase();
      if (tLabel.indexOf(val) === -1) {
        jQuery(this).parent().hide();
      } else {
        jQuery(this).parent().show();
      }
    });

    // filter station
    jQuery('#stationDiv').find('input:checkbox').each(function () {
      const tLabel = jQuery(this).parent().text().trim().replace(/\s\s+/g, ' ').toLowerCase();
      if (tLabel.indexOf(val) === -1) {
        jQuery(this).parent().hide();
      } else {
        jQuery(this).parent().show();
      }
    });

    // filter rotulo
    jQuery('#rotuloDiv').find('input:checkbox').each(function () {
      const tLabel = jQuery(this).parent().text().trim().replace(/\s\s+/g, ' ').toLowerCase();
      if (tLabel.indexOf(val) === -1) {
        jQuery(this).parent().hide();
      } else {
        jQuery(this).parent().show();
      }
    });


    // filter brand
    jQuery('#brandDiv').find('input:checkbox').each(function () {
      const tLabel = jQuery(this).parent().text().trim().replace(/\s\s+/g, ' ').toLowerCase();
      if (tLabel.indexOf(val) === -1) {
        jQuery(this).parent().hide();
      } else {
        jQuery(this).parent().show();
      }
    });

    // filter channel
    jQuery('#channelDiv').find('input:checkbox').each(function () {
      const tLabel = jQuery(this).parent().text().trim().replace(/\s\s+/g, ' ').toLowerCase();
      if (tLabel.indexOf(val) === -1) {
        jQuery(this).parent().hide();
      } else {
        jQuery(this).parent().show();
      }
    });

  }


  goProductDetailForm(model) {
    this.appDataService.setData({ input: model });
    this.bsModalRef = this.modalService.show(ProductDetailComponent, { backdrop: 'static' });
  }


  export(type) {
    var ext, contentType;
    switch (type) {
      case 1: {
        ext = "xlsx";
        contentType = 'application/vnd.ms-excel';
        break;
      }
      case 2: {
        ext = "pdf";
        contentType = 'application/pdf';
        break;
      }
      case 3: {
        ext = "csv";
        contentType = 'text/csv';
        break;
      }
    }

    this.translate.getTranslate().get(['COMMON_WORDS.PROCESSING_FILE']).subscribe(translation => {
      this.message = translation['COMMON_WORDS.PROCESSING_FILE'];
    });
    this.myWindow = window.open("", '_blank');
    this.myWindow.document.write(this.message + " - Inventario ");

    this.exportFileService.export("INV", ext, JSON.stringify(this.productFilter)).subscribe(
      data => {
        //Obtenemos el nombre-> attachment;filename=PublicationResult_20181213050840.csv -> PublicationResult_20181213050840.csv
        var name = data.headers.get('content-disposition').split(";")[1].split("=")[1];
        this.downloadFile(data, name, contentType);
      }),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }

  downloadFile(data: any, name, type) {
    let parsedResponse = data._body;
    let blob = new Blob([parsedResponse], { type: type });
    let url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  mostrarfiltros() {
    jQuery(".filter-input-container").css("display", "block");
  }

  cerrarfiltros() {
    jQuery(".filter-input-container").css("display", "none");
  }

  mostrarcerrar_filtro(cajafiltro) {
    let cerradoabierto = jQuery('#' + cajafiltro + ">div.filter-scroll").css("display");
    if (cerradoabierto == "none") {
      jQuery('#' + cajafiltro + ">div.filter-scroll").css("display", "block");
    } else {
      jQuery('#' + cajafiltro + ">div.filter-scroll").css("display", "none");
    }
  }

  onAlphaOrEanOrSkuChange(value: string) {
    let oldVal = '';
    let newVal = value;
    while (oldVal != newVal) {
      oldVal = newVal;
      newVal = newVal.replace(/(?:\r\n|\r|\n)/g, ',');
      newVal = newVal.replace(/ ,/g, ',');
      newVal = newVal.replace(/, /g, ',');
      newVal = newVal.replace(/,,/g, ',');
    }
    this.filterForm.patchValue({ alphaOrEanOrSku: newVal });

    this._bindProductFilterForm();
  }

  onAlphaOrEanOrSkuFocusOut() {
    this.filterForm.value.alphaOrEanOrSku = this.filterForm.value.alphaOrEanOrSku.trim();
    if (this.filterForm.value.alphaOrEanOrSku.length > 0 && this.filterForm.value.alphaOrEanOrSku.endsWith(','))
      this.filterForm.value.alphaOrEanOrSku = this.filterForm.value.alphaOrEanOrSku.substring(0, this.filterForm.value.alphaOrEanOrSku.length - 1);
    this.filterForm.patchValue({ alphaOrEanOrSku: this.filterForm.value.alphaOrEanOrSku });
  }

  modifyList(element, filtername, index) {
    var filter = {
      type: filtername,
      name: element.name,
      id: index
    }
    var deleted = false;
    switch (filtername) {
      case 'rotulo': {
        for (let i = 0; i < this.selectedFiltersRotulos.length; i++) {
          if (this.selectedFiltersRotulos.length > 0) {
            if (this.selectedFiltersRotulos[i].id == filter.id) {
              this.selectedFiltersRotulos.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersRotulos.push(filter);
        }
        break;
      }
      case 'station': {
        for (let i = 0; i < this.selectedFiltersStations.length; i++) {
          if (this.selectedFiltersStations.length > 0) {
            if (this.selectedFiltersStations[i].id == filter.id) {
              this.selectedFiltersStations.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersStations.push(filter);
        }
        break;
      }
      case 'brand': {
        for (let i = 0; i < this.selectedFiltersBrands.length; i++) {
          if (this.selectedFiltersBrands.length > 0) {
            if (this.selectedFiltersBrands[i].id == filter.id) {
              this.selectedFiltersBrands.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersBrands.push(filter);
        }
        break;
      }
      case 'category': {
        for (let i = 0; i < this.selectedFiltersCategories.length; i++) {
          if (this.selectedFiltersCategories.length > 0) {
            if (this.selectedFiltersCategories[i].id == filter.id) {
              this.selectedFiltersCategories.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersCategories.push(filter);
        }
        break;
      }
      case 'error': {
        for (let i = 0; i < this.selectedFiltersError.length; i++) {
          if (this.selectedFiltersError.length > 0) {
            if (this.selectedFiltersError[i].id == filter.id) {
              this.selectedFiltersError.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersError.push(filter);
        }
        break;
      }

      case 'active': {
        for (let i = 0; i < this.selectedFilterActive.length; i++) {
          if (this.selectedFilterActive.length > 0) {
            if (this.selectedFilterActive[i].id == filter.id) {
              this.selectedFilterActive.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFilterActive.push(filter);
        }
        break;
      }


      case 'channelNotIn': {
        for (let i = 0; i < this.selectedFiltersChannelNotIn.length; i++) {
          if (this.selectedFiltersChannelNotIn.length > 0) {
            if (this.selectedFiltersChannelNotIn[i].id == filter.id) {
              this.selectedFiltersChannelNotIn.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersChannelNotIn.push(filter);
        }
        break;
      }

      case 'channelIn': {
        for (let i = 0; i < this.selectedFiltersChannelIn.length; i++) {
          if (this.selectedFiltersChannelIn.length > 0) {
            if (this.selectedFiltersChannelIn[i].id == filter.id) {
              this.selectedFiltersChannelIn.splice(i, 1);
              deleted = true;
            }
          }

        }
        if (!deleted) {
          this.selectedFiltersChannelIn.push(filter);
        }
        break;
      }

      default: {
        break;
      }
    }

  }

}


