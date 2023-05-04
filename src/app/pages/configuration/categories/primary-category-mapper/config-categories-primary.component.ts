import { MOCK_CHANNELS } from 'app/pages/presets/shared/mock-data';
import { MOCK_CATEGORIES_ECOMMERCE } from 'app/pages/configuration/categories/shared/mock-data';
import { MOCK_CATEGORIES_CHANNEL } from 'app/pages/configuration/categories/shared/mock-data';
import { MOCK_CATEGORIES_MAP } from 'app/pages/configuration/categories/shared/mock-data';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { ConfigCategoriesPrimaryService } from 'app/pages/configuration/categories/primary-category-mapper/config-categories-primary.service';
import { PresetsService } from 'app/pages/presets/shared/presets.service';
import { StoreService } from 'app/shared/store.service';
import { Data } from 'app/pages/configuration/categories/shared/data';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { BreadcrumbService } from 'app/services/breadcrumb.service';
import { TranslateService } from 'app/services/translate.service';

@Component({
  selector: 'chm-config-categories-primary',
  templateUrl: './config-categories-primary.component.html',
  styleUrls: ['./config-categories-primary.component.css']
})
export class ConfigCategoriesPrimaryComponent implements OnInit {

  columns = [];
  isLoading = true;

  mensaje = "Hola!";

  isLoadingCategoriasCanal = false;
  isLoadingCategoriasHermes = false;
  isLoadingMapeos = false;
    
  mostrarIdsCategorias = true;

  @Input() idSite = null;
  @Input() idChannel = null;
  listParentEcommerceCategories: any[] = [];
  fListParentEcommerceCategories: any[] = [];
  mapEcommerceCategories = new Map();
  listParentChannelCategories: any[] = [];
  fListParentChannelCategories: any[] = [];
  mapChannelCategories = new Map();
  listMappedCategories: any[] = [];
  listMappedCategoriesAux: any[] = [];
  // flags ejecución
  flagExecSiteChannels = 0;

  constructor(
    private storeSrv: StoreService,
    private configCategoriesService: ConfigCategoriesPrimaryService,
    private modelosService: PresetsService,
    private router: Router,
    private data: Data,
    private renderer: Renderer2,
    private breadServ: BreadcrumbService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService) {
    storeSrv.siteChanged$.subscribe(id => this.onSiteChanged(id));
  }

  ngOnInit() {
    //console.log(">>>>>>> idSite = " + this.idSite);
    //console.log(">>>>>>> idChannel = " + this.idChannel);
    //this.getCategoriesData(this.idChannel, this.idSite) 
  }
    
  ngOnChanges(changes) {
    this.getCategoriesData(this.idChannel, this.idSite) 
  }
    
  onSiteChanged(id: number) {
  }

  // Get all neccesary data of categories by channel
  getCategoriesData(idChannel: number, idSite: number) {
    console.log("getCategoriesData > idChannel: " + idChannel);
    this.idChannel = idChannel;
    this.idSite = idSite;

    this.listParentEcommerceCategories = [];
    this.fListParentEcommerceCategories = [];
    this.mapEcommerceCategories = new Map();
    this.listParentChannelCategories = [];
    this.fListParentChannelCategories = [];
    this.mapChannelCategories = new Map();
    this.listMappedCategories = [];
    this.listMappedCategoriesAux = [];

    this.isLoadingCategoriasCanal = true;
    this.isLoadingCategoriasHermes = true;
    this.isLoadingMapeos = true;

    // Site categories
    console.log("CATEGORIAS -> Se van a cargar las categorías del Site en Hermes...");
    this.getParentEcommerceCategories();

  }

  // Get all PARENTS ecommerce categories of the current site
  getParentEcommerceCategories() {
    console.log("Lanzando getParentEcommerceCategories");

    this.listParentEcommerceCategories.length = 0;

    if (environment.mock) {
      //this.listChannelCategories = MOCK_CATEGORIES_CHANNEL;
      this.isLoading = false;
    } else {
      this.configCategoriesService.getParentSiteCategories2(this.storeSrv.getSite().id).subscribe(
        (data) => {
          console.log("CATEGORIAS -> Categorías del site en Hermes cargadas correctamente.");
          this.isLoadingCategoriasHermes = false;
          
          this.listParentEcommerceCategories = [];
          this.fListParentEcommerceCategories = [];
            
          for (let key in data) {
            this.listParentEcommerceCategories.push(data[key]);
          }
          //console.log("LISTADO PADRES CATEGORIAS ECOMMERCE");
          //console.log(this.listParentEcommerceCategories);
          //console.log(this.getLogMapeo());
          this.fListParentEcommerceCategories = this.listParentEcommerceCategories;

          // Channel categories
          console.log("CATEGORIAS -> Se van a cargar las categorías del Canal...");
          this.getParentChannelCategories(this.idChannel);
          //this.getMapChannelCategories(idChannel);
          this.cdr.markForCheck();
        },
        (error) => console.log("[ERROR] getParentEcommerceCategories : " + error)
      );
      this.isLoading = false;
    }
  }

  // Get all ecommerce categories of the current site
  getMapEcommerceCategories() {
    console.log("Lanzando getEcommerceCategories");

    this.mapEcommerceCategories = new Map();

    if (environment.mock) {
      //this.mapEcommerceCategories = MOCK_CATEGORIES_ECOMMERCE;
      this.isLoading = false;
    } else {
      this.configCategoriesService.getMapSiteCategories().subscribe(
        (data) => {
          this.isLoadingCategoriasHermes = false;

          this.mapEcommerceCategories = data;
          //.log("LISTADO CATEGORIAS ECOMMERCE");
          //console.log(this.mapEcommerceCategories);

        },
        (error) => console.log("[ERROR] getMapEcommerceCategories : " + error)
      );
      this.isLoading = false;
    }
  }

  // Get all PARENTS ecommerce categories of the current site
  getParentChannelCategories(idChannel: number) {
    //console.log("Lanzando getParentChannelCategories");

    this.listParentChannelCategories.length = 0;

    if (environment.mock) {
      //this.listChannelCategories = MOCK_CATEGORIES_CHANNEL;
      this.isLoading = false;
    } else {
      this.configCategoriesService.getParentChannelCategories(idChannel).subscribe(
        (data) => {
            
          this.listParentChannelCategories = [];
          this.fListParentChannelCategories = [];
            
          console.log("CATEGORIAS -> Categorías del canal cargadas correctamente.");
          for (let key in data) {
            this.listParentChannelCategories.push(data[key]);
          }
          //console.log("LISTADO PADRES CATEGORIAS CANAL");
          //console.log(this.listParentChannelCategories);
          this.fListParentChannelCategories = this.listParentChannelCategories;

          // Mapped categories
          console.log("CATEGORIAS -> Se van a cargar los mapeos...");
          this.getMappedCategories(this.idChannel);
        },
        (error) => console.log("[ERROR] getParentChannelCategories : " + error)
      );
      this.isLoading = false;
    }
  }

  // Get all categories of the current channel
  getMapChannelCategories(idChannel: number) {

    //console.log("Lanzando getMapChannelCategories");

    this.mapChannelCategories = new Map();

    if (environment.mock) {
      //this.mapChannelCategories = MOCK_CATEGORIES_CHANNEL;
      this.isLoading = false;
    } else {
      this.configCategoriesService.getMapChannelCategories(idChannel).subscribe(
        (data) => {
          this.mapChannelCategories = data;
          //console.log("LISTADO CATEGORIAS CANAL");
          //console.log(this.mapChannelCategories);

        },
        (error) => console.log("[ERROR] getMapChannelCategories : " + error)
      );
      this.isLoading = false;
    }
  }

  // Get all mapped categories of the current site and channel
  getMappedCategories(idChannel: number) {

    //console.log("Lanzando getMappedCategories");

    this.listMappedCategories.length = 0;
    this.listMappedCategoriesAux.length = 0;

    if (environment.mock) {
      this.listMappedCategories = MOCK_CATEGORIES_MAP;
      this.isLoading = false;
      this.isLoadingMapeos = false;
    } else {
      this.configCategoriesService.getMappedCategoriesByChannel(idChannel).subscribe(
        (data) => {
          console.log("CATEGORIAS -> Mapeos cargados correctamente.");
          this.isLoadingMapeos = false;

          this.listMappedCategories = [];
          this.listMappedCategoriesAux = [];
            
          for (let key in data) {
            this.listMappedCategoriesAux.push(data[key]);
          }
          this.adaptDataMappedCategories();
        },
        (error) => console.log("[ERROR] getEcommerceCategories : " + error)
      );
      this.isLoading = false;
      this.getLogMapeo();
    }
  }

  // Adapt mapped categories to lists
  adaptDataMappedCategories() {
    let channelCatAux = null;
    let ecommerceCatAux = null;
      
    console.log('ASIGNAMOS EN EL FRONT LOS MAPEOS QUE HEMOS RECIBIDO')

    console.log("this.listMappedCategoriesAux");
    console.log(this.listMappedCategoriesAux);

    console.log("this.fListParentChannelCategories");
    console.log(this.fListParentChannelCategories);

    console.log("this.fListParentEcommerceCategories");
    console.log(this.fListParentEcommerceCategories);

    for(var i = 0; i<this.listMappedCategoriesAux.length; i++) {
      var mappedCategory = this.listMappedCategoriesAux[i];
      console.log("mappedCategory");
      console.log(mappedCategory);

      for(var j = 0; j<this.fListParentChannelCategories.length; j++) {
        var catDestino = this.fListParentChannelCategories[j];
        if(catDestino.idCategoriaCanal == mappedCategory.idCategoriaCanal) {
          channelCatAux = catDestino;
        }
      }
      console.log("channelCatAux");
      console.log(channelCatAux);

      for(var j = 0; j<this.fListParentEcommerceCategories.length; j++) {
        var catOrigen = this.fListParentEcommerceCategories[j];
        if(catOrigen.id == mappedCategory.idCategoriaHermes) {
          ecommerceCatAux = catOrigen;
          if(channelCatAux) {
            this.fListParentEcommerceCategories[j].asociada = true;
          }
        }
      }
      console.log("ecommerceCatAux");
      console.log(ecommerceCatAux);

      if(ecommerceCatAux) {
          for(var j = 0; j<this.fListParentChannelCategories.length; j++) {
            var catDestino = this.fListParentChannelCategories[j];
            if(catDestino.idCategoriaCanal == mappedCategory.idCategoriaCanal) {
                if (!this.fListParentChannelCategories[j].categoriaRel2)
                  this.fListParentChannelCategories[j].categoriaRel2 = [];
        
                this.fListParentChannelCategories[j].categoriaRel2.push(ecommerceCatAux);
            }
          }
      }
        
//      if(ecommerceCatAux && channelCatAux) {
//        
//        if (!channelCatAux.categoriaRel2)
//          channelCatAux.categoriaRel2 = [];
//
//        channelCatAux.categoriaRel2.push(ecommerceCatAux);
//
//        // Se deshabilita la categoría del listado de categorías del site
//        ecommerceCatAux.asociada = true;          
//          
//        console.log("MAPEADO OK");
//      } else {
//        console.log("NO SE HA PODIDO MAPEAR");
//      }
    }
    
    console.log("this.listMappedCategoriesAux");
    console.log(this.listMappedCategoriesAux);

    console.log("this.fListParentChannelCategories");
    console.log(this.fListParentChannelCategories);

    console.log("this.fListParentEcommerceCategories");
    console.log(this.fListParentEcommerceCategories);
  }

  // Ejecuta la asociación de paridad entre categorías

  // Capture drag&drop event
  dropCategory($event: any, catDestino: any) {
      
      let categoryDropped = $event.dragData;

      // Se asocia la categoría en listado de categorías del canal
      if (!catDestino.categoriaRel2)
          catDestino.categoriaRel2 = [];

      catDestino.categoriaRel2.push(categoryDropped);

      // Se deshabilita la categoría del listado de categorías del site
      categoryDropped.asociada = true;

      // Se añade la categoría al mapa
      this.addCategoryToMap(catDestino, categoryDropped.id);

      // Se guarda en BD
      this.configCategoriesService.mapCategory(this.idChannel, catDestino.idCategoriaCanal, categoryDropped.id).subscribe(
          (data) => {
              // Controlar evento al guardar
              console.log("Saved");
          },
          (error) => {
              // Si ha habido algún error al guardar se deshacen los cambios en el FRONT para que la vista sea consistente
              alert("No se pudo guardar el mapeo: " + categoryDropped.name + " >>> " + catDestino.nombre);
              console.log("[ERROR] getEcommerceCategories : " + JSON.stringify(error));

              if (catDestino.categoriaRel2) {

                  for (var i = 0; i < catDestino.categoriaRel2.length; i++) {

                      if (catDestino.categoriaRel2[i].idCategoria == categoryDropped.idCategoria) {
                          catDestino.categoriaRel2.splice(i, 1);
                          categoryDropped.asociada = false;
                          this.removeCategoryFromMap(categoryDropped);
                      }
                  }
              }
          }
      );
  }

  // Disassociate category from channel
  disassociateCategory(siteCat: any, channelCat: any) {

      if (channelCat.categoriaRel2) {

          for (var i = 0; i < channelCat.categoriaRel2.length; i++) {

              if (channelCat.categoriaRel2[i].idCategoria == siteCat.idCategoria) {
                  channelCat.categoriaRel2.splice(i, 1);
                  siteCat.asociada = false;
                  this.removeCategoryFromMap(siteCat);
              }
          }
      }
      
      // Se guarda el cambio en BD
      this.configCategoriesService.unmapCategory(this.idChannel, channelCat.idCategoriaCanal, siteCat.id).subscribe(
        (data) => {
          console.log("Saved");
        },
        (error) => {
            // Si ha habido algún error al guardar se deshacen los cambios en el FRONT para que la vista sea consistente
            alert("No se pudo elminar el mapeo: " + siteCat.name + " >>> " + channelCat.nombre);
            console.log("[ERROR] getEcommerceCategories : " + JSON.stringify(error));      
            
            // Se asocia la categoría en listado de categorías del canal
            if (!channelCat.categoriaRel2)
                channelCat.categoriaRel2 = [];

            channelCat.categoriaRel2.push(siteCat);

            // Se deshabilita la categoría del listado de categorías del site
            siteCat.asociada = true;

            // Se añade la categoría al mapa
            this.addCategoryToMap(channelCat, siteCat.id);
        }
      );
      
  }

  // Add category to mapped
  addCategoryToMap(categoryChannel: any, idCategory: number) {
    let newMappedCategory = {
      idCategoriaCanal: categoryChannel,
      idCategoriaHermes: idCategory,
      idSiteRotulo: this.idSite
    }

    this.listMappedCategories.push(newMappedCategory);
    this.getLogMapeo();
  }

  // Remove category from mapped
  removeCategoryFromMap(categoryChannel: any) {
    this.listMappedCategories.splice(this.listMappedCategories.indexOf(categoryChannel, 1));
    this.getLogMapeo();
  }

  // Save mapped Categories
  saveMappedCategories($event: any) {
    //console.log("Lanzando saveMappedCategories");

    this.isLoading = true;

    if (environment.mock) {
      alert("No disponible con MOCK DATA");
      this.isLoading = false;
    } else {
      this.configCategoriesService.setMappedCategories(this.idChannel, this.listMappedCategories).subscribe(
        (data) => {
          // Controlar evento al guardar
          alert("Saved");
        },
        (error) => console.log("[ERROR] getEcommerceCategories : " + JSON.stringify(error))
      );
      this.isLoading = false;
    }
  }

  getLogMapeo() {
    //console.log(":::: Mapeo de categorías actual ::::")
    //console.log(this.listMappedCategories);
  }

  filterSite(event) {
    const type = event.target.value;
    const listParentEcommerceCategories = [];

    this.listParentEcommerceCategories.forEach(category => {
      if (type === 'all') {
        listParentEcommerceCategories.push(category);
      } else if (type === 'Mapped' && category.asociada) {
        listParentEcommerceCategories.push(category);
      } else if (type === 'Not Mapped' && !category.asociada) {
        listParentEcommerceCategories.push(category);
      }
    });
    this.fListParentEcommerceCategories = listParentEcommerceCategories;
  }

  filterChannel(event) {
    const type = event.target.value;
    const listParentChannelCategories = [];

    this.listParentChannelCategories.forEach(category => {
      if (type === 'all') {
        listParentChannelCategories.push(category);
      } else if (type === 'Mapped' && category.hasOwnProperty("categoriaRel2")) {
        if (category.categoriaRel2.length > 0) {
          listParentChannelCategories.push(category);
        }
      } else if (type === 'Not Mapped' && !category.hasOwnProperty("categoriaRel2")) {
        listParentChannelCategories.push(category);
      } else if (type === 'Not Mapped' && category.hasOwnProperty("categoriaRel2")) {
        if (category.categoriaRel2.length < 0) {
          listParentChannelCategories.push(category);
        }
      }
    });
    this.fListParentChannelCategories = listParentChannelCategories;
  }

}
