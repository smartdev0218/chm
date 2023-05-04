import { Injectable } from '@angular/core';

import { FormData, General, Model } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { Observable } from 'rxjs/Observable';
import { ChmHttp } from 'app/shared/chm-http.model';
import { AuthHttp } from 'angular2-jwt';
import { StoreService } from 'app/shared/store.service';

@Injectable()
export class FormDataService extends ChmHttp {

    private formData: FormData = new FormData();
    private isGeneralFormValid = false;
    private isProductsFormValid = false;
    private isModelsFormValid = false;

    private idsProductosPublicacion = [];

    publicacionModel;
    testing = false;
    debug = false;

    viewCacheData = {
        general_channels: null,
        product: null,
        model_models: null,
        model_modelTypes: null,
    };

    constructor(
        private http: AuthHttp,
        private store: StoreService,
        private workflowService: WorkflowService) {
        super();
    }


    getGeneral(): General {
        // Return the Personal data
        const general: General = {
            name: this.formData.name,
            description: this.formData.description,
            channel: this.formData.channel,
            priority: this.formData.priority,
            startDate: this.formData.startDate,
            finishDate: this.formData.finishDate
        };
        return general;
    }

    setGeneral(data: General) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isGeneralFormValid = true;
        this.formData.name = data.name;
        this.formData.description = data.description;
        this.formData.channel = data.channel;
        this.formData.priority = data.priority;
        this.formData.startDate = data.startDate;
        this.formData.finishDate = data.finishDate;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.general);
    }

    getProducts2(): any[] {
        // Return the work type
        return this.formData.products;
    }


    getProducts(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res))
            .catch(this.handleError);
    }

    getIdsProducts(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/ids`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res))
            .catch(this.handleError);
    }

    setProducts(data: any[]) {
        // Update the work type only when the Work Form had been validated successfully
        this.isProductsFormValid = true;
        this.formData.products = data;

        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.products);
    }


    setIdsProductosPublicacion(idsProductos) {
        this.idsProductosPublicacion = idsProductos;
    }

    getIdsProductosPublicacion() {
        return this.idsProductosPublicacion;
    }

    getModels(): any[] {
        return this.formData.models;
    }

    setModels(data: any[]) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isModelsFormValid = true;
        this.formData.models = data;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.models);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isGeneralFormValid = this.isProductsFormValid = this.isModelsFormValid = false;
        this.viewCacheData = {
            general_channels: null,
            product: null,
            model_models: null,
            model_modelTypes: null,
        };
        this.publicacionModel = {};
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isGeneralFormValid &&
            this.isProductsFormValid &&
            this.isModelsFormValid;
    }

    getPublicationModel() {
        const publicacionModel = {};
        publicacionModel['active'] = true;
        publicacionModel['channel'] = { 'channelId': this.formData.channel.channelId, 'idSiteCanal': this.formData.channel.idSiteCanal };
        publicacionModel['name'] = this.formData.name;
        publicacionModel['priority'] = this.formData.priority;
        publicacionModel['description'] = this.formData.description;
        publicacionModel['startDate'] = this.formData.startDate;
        publicacionModel['finishDate'] = this.formData.finishDate;
        publicacionModel['idSiteCanal'] = this.formData.channel.idSiteCanal;

        const tProudcts = [];
        this.formData.products.map(data => tProudcts.push({ 'productId': data.productId }));
        publicacionModel['products'] = tProudcts;

        const tModels = [];
        this.formData.models.map(data => tModels.push({ 'modelId': Number(data.modelId) }));
        publicacionModel['models'] = tModels;
        publicacionModel['loadedFilter'] = this.formData.preloadedFilters ? JSON.stringify(this.formData.preloadedFilters) : null;

        publicacionModel['autoPublish'] = this.formData.autoPublish;
        return publicacionModel;
    }

    setPublicationModel(publicacionModel) {
        this.publicacionModel = publicacionModel;

        this.formData.channel.channelId = publicacionModel['channel'].channelId;
        this.formData.name = publicacionModel['name'];
        this.formData.priority = publicacionModel['priority'];
        this.formData.description = publicacionModel['description'];
        this.formData.startDate = publicacionModel['startDate'];
        this.formData.finishDate = publicacionModel['finishDate'];

        this.formData.products = publicacionModel['products'];
        if (publicacionModel['loadedFilter']) {
            this.formData.preloadedFilters = JSON.parse(publicacionModel['loadedFilter']);
        }
        this.formData.publicationId = publicacionModel['publicationId'];

        this.formData.autoPublish = publicacionModel['autoPublish'];

        this.formData.models = [];
        publicacionModel['models'].map(data => {
            if (data.modelTypeId === 1) {
                this.formData.models.push({ 'type': 'price', 'modelId': data.modelId, 'modelName': data.modelName });
            } else if (data.modelTypeId === 2) {
                this.formData.models.push({ 'type': 'description', 'modelId': data.modelId, 'modelName': data.modelName });
            } else if (data.modelTypeId === 3) {
                this.formData.models.push({ 'type': 'send', 'modelId': data.modelId, 'modelName': data.modelName });
            } else if (data.modelTypeId === 4) {
                this.formData.models.push({ 'type': 'stock', 'modelId': data.modelId, 'modelName': data.modelName });
            } else if (data.modelTypeId === 5) {
                this.formData.models.push({ 'type': 'mercadoLibreSettings', 'modelId': data.modelId, 'modelName': data.modelName });
            }
        });
    }

    // GET /sites/{idSite}/products/categories
    getProductCategories(productFilter: any) {
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}products/categories`)
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /sites/{idSite}/products/brands?filterFields=&filterValues
    getProductBrands(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/brands`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }


    // POST /sites/{idSite}/products/stations?filterFields=&filterValues
    getProductStations(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/stations`,  JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /sites/{idSite}/products/rotulos?filterFields=&filterValues
    getRotulos(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/rotulos`,  JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res));
    }

    // POST /sites/{idSite}/products/count?filterFields=&filterValues
    getProductCount(productFilter: any) {
        return <Observable<any>>this.http
            .post(`${this.store.getSitesUrl()}products/count`, JSON.stringify(productFilter))
            .map(res => this.extractData<Object[]>(res))
            .catch(this.handleError);

    }

    // GET /sites/{idSite}/channels?filterFields=&filterValues
    getProductChannels(productFilter: any) {
        let queryString = '';
        // remove brand for filter
        const filterFields = productFilter.filterFields.split(',');
        const filterValues = productFilter.filterValues.split(',');
        const channelIndex = filterFields.indexOf('channel');
        if (channelIndex > -1) {
            filterFields.splice(channelIndex, 1);
            filterValues.splice(channelIndex, 1);
        }
        return <Observable<any>>this.http
            .get(`${this.store.getSitesUrl()}channels?${queryString}`)
            .map(res => this.extractData<Object[]>(res));
    }

    setPreloadedFilters(fields, values){
        this.formData.preloadedFilters = {
            filterFields: fields,
            filterValues: values
        };
    }

    setAutoPushishFlag(autoPublish){
        this.formData.autoPublish = autoPublish;
    }
}
