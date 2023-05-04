export class FormData {
    name = '';
    description = '';
    channel = { channelId: 0, name: '', idSiteCanal: 0 };
	priority = 0;
    startDate = '';
    finishDate = '';

    products = [];
    models: any[] = [];
    preloadedFilters = {
        filterFields: 'active',
        filterValues: 'true'
    };
    publicationId = 0;
    autoPublish = false;

    clear() {
        this.name = '';
        this.description = '';
		this.priority = 0;
        this.channel = { channelId: 0, name: '', idSiteCanal: 0 };
        this.startDate = '';
        this.finishDate = '';

        this.products = [];

        this.models = [];

        this.publicationId = 0;
        this.autoPublish = false;
        this.clearPreloadedFilters();
    }

    clearPreloadedFilters() {
        this.preloadedFilters = {
            filterFields: 'active',
            filterValues: 'true'
        };
    }
}

export class General {
    name = '';
    description = '';
    channel = { channelId: 0, name: '', idSiteCanal: 0 };
    startDate = '';
    finishDate = '';
	priority = 0;
}

export class Model {
    modelName = '';
    modelTypeId = '';
    modelTypeName = '';
}

export class Modeltype {
    idModelType = 0;
    name = '';
}
