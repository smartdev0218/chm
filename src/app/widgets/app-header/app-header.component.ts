import { Component, Input, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TranslateService } from 'app/services/translate.service';
import { HermesService } from 'app/shared/hermes.service';
import { StoreService } from 'app/shared/store.service';
const langUrl = (isDevMode()) ? '/chm/backend/login/language' : '/chm/login/language';

@Component({
  selector: 'app-header',
  styleUrls: ['./app-header.component.css'],
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {
  @Input() public display_messages = true;
  @Input() public display_notifications = true;
  @Input() public display_tasks = true;
  @Input() public display_user = true;
  @Input() public display_control = true;
  @Input() public display_logout = false;
  @Input() public display_customLogout = true;
  @Input() public header_components = [];

  sites: any[] = [];
  currSite: any;
  language: any;

  constructor(private hermesSrv: HermesService,
    private store: StoreService,
    private userService: UserService,
    public translate: TranslateService,
    private router: Router) {

  }

  ngOnInit() {
    console.log("Haciendo request de idioma")
    
    this.hermesSrv.getLang().subscribe(
      data =>{
          console.log("Respuesta lang:");
          console.log(data);
          this.language = data.toLowerCase();
          if(this.language != 'es' && this.language != 'en' && this.language != 'pt' )
            this. language = 'en';
          this.translate.getTranslate().use(this.language);
          console.log("Asignamos idioma "+this.language+" desde el app-header");
          
          this.hermesSrv.getSites()
          .subscribe(sites => {
			sites.sort(function(a, b) {
				return a.name.localeCompare(b.name);
			});
            this.sites = sites;
            this.currSite = this.sites[0];
            this.store.setSite(this.currSite);
          });
      },
      error =>{
          console.log("Error getting user language")
      }
    );


    
    

    /*console.log("AppHeaderComponent => " + "ngOnInit");

    this.sites = [{ "id": 415, "name": "_OLD_UD Las Palmas_OLD_" }, { "id": 475, "name": "338mobile" }, { "id": 318, "name": "338online" }, { "id": 680, "name": "338online-34-A.V.E." }, { "id": 566, "name": "98 Coast Av" }, { "id": 627, "name": "A.D. Alcorcón" }, { "id": 48, "name": "Adela Gil" }, { "id": 506, "name": "Africalia" }, { "id": 494, "name": "Aherpa" }, { "id": 448, "name": "AHORA Alvaro Olivares" }, { "id": 626, "name": "Albacete B." }, { "id": 456, "name": "Albertini" }, { "id": 677, "name": "Alex Silva" }, { "id": 729, "name": "Alex Silva Especial" }, { "id": 520, "name": 'Alexandra Plata' }, { 'id': 429, 'name': 'Amichi' }, { 'id': 547, 'name': 'Anaissa' }, { 'id': 572, 'name': 'Antonia Martorell' }, { 'id': 233, 'name': 'Aplauso' }, { 'id': 356, 'name': 'aristocrazy' }, { 'id': 636, 'name': 'At. Osasuna' }, { 'id': 608, 'name': 'Athletic Club' }, { 'id': 609, 'name': 'Atlético Madrid' }, { 'id': 558, 'name': 'Azura' }, { 'id': 505, 'name': 'Baby Infantile' }, { 'id': 565, 'name': 'Beagle and Fox' }, { 'id': 49, 'name': 'Bikila' }, { 'id': 346, 'name': 'Bikila Multideporte' }, { 'id': 628, 'name': 'Bilbao Athletic' }, { 'id': 489, 'name': 'Boaonda' }, { 'id': 84, 'name': 'bobtail' }, { 'id': 599, 'name': 'Bowtie' }, { 'id': 46, 'name': 'BoxBox' }, { 'id': 384, 'name': 'Bricoshoes' }, { 'id': 661, 'name': 'Broker And Sacco ' }, { 'id': 361, 'name': 'Bunker' }, { 'id': 715, 'name': 'By Peppas' }, { 'id': 632, 'name': 'C.D. Leganés' }, { 'id': 633, 'name': 'C.D. Lugo' }, { 'id': 344, 'name': 'C.D. Mirandés' }, { 'id': 352, 'name': 'C.D. Numancia' }, { 'id': 57, 'name': 'Cache' }, { 'id': 643, 'name': 'Cache' }, { 'id': 103, 'name': 'Cadena4' }, { 'id': 522, 'name': 'Calzados Layssa' }, { 'id': 423, 'name': 'Calzados Marian' }, { 'id': 224, 'name': 'Calzados Maribel' }, { 'id': 461, 'name': 'Calzados Monchel' }, { 'id': 242, 'name': 'Calzados Nico' }, { 'id': 288, 'name': 'Calzados Pedro' }, { 'id': 650, 'name': 'Calzados Riaño' }, { 'id': 674, 'name': 'Calzados Romero' }, { 'id': 241, 'name': 'Canarias' }, { 'id': 675, 'name': 'Carabas-351-Spartoo' }, { 'id': 668, 'name': 'Casuary Shoes' }, { 'id': 539, 'name': 'Categorias Base' }, { 'id': 65, 'name': 'Cayetano Gimenez' }, { 'id': 253, 'name': 'chequeregalo' }, { 'id': 731, 'name': 'Chetto' }, { 'id': 741, 'name': 'Chiruca' }, { 'id': 256, 'name': 'Club modalia ' }, { 'id': 440, 'name': 'Conguitos' }, { 'id': 549, 'name': 'Copia de Adela Gil (3)' }, { 'id': 710, 'name': 'Copia de Box&Box' }, { 'id': 629, 'name': 'Córdoba C.F.' }, { 'id': 430, 'name': 'CR7Underwear' }, { 'id': 625, 'name': 'D. Alavés' }, { 'id': 474, 'name': 'DColores' }, { 'id': 704, 'name': 'Destroy' }, { 'id': 498, 'name': 'Dias Como Estos' }, { 'id': 454, 'name': 'Discover Underwear ' }, { 'id': 548, 'name': 'Divina Providencia' }, { 'id': 471, 'name': 'Ecozap' }, { 'id': 248, 'name': 'El Dantes' }, { 'id': 187, 'name': 'El Valle' }, { 'id': 591, 'name': 'Elche C.F.' }, { 'id': 237, 'name': 'Elche CF_old' }, { 'id': 226, 'name': 'Elena Hernandez' }, { 'id': 678, 'name': 'Enzo Tesoti' }, { 'id': 135, 'name': 'ErreYce' }, { 'id': 613, 'name': 'F.C. Barcelona ' }, { 'id': 714, 'name': 'Fabrica Vulcasa' }, { 'id': 207, 'name': 'Felix Rochas' }, { 'id': 227, 'name': 'Feria Virtual' }, { 'id': 386, 'name': 'Fitsfeet' }, { 'id': 312, 'name': 'Flamenkas' }, { 'id': 562, 'name': 'Flamingos Life' }, { 'id': 338, 'name': 'Franjifiel' }, { 'id': 491, 'name': 'Free Bohemia' }, { 'id': 459, 'name': 'Free Time' }, { 'id': 502, 'name': 'Futura4Retail' }, { 'id': 670, 'name': 'Ganzitos' }, { 'id': 551, 'name': 'Garatti' }, { 'id': 58, 'name': 'Garvalin' }, { 'id': 26, 'name': 'GbBravo' }, { 'id': 614, 'name': 'Getafe C.F.' }, { 'id': 470, 'name': 'Gioseppo' }, { 'id': 630, 'name': 'Girona F.C.' }, { 'id': 358, 'name': 'Golf Modalia' }, { 'id': 588, 'name': 'Golfblessyou' }, { 'id': 615, 'name': 'Granada C.F.' }, { 'id': 322, 'name': 'Green' }, { 'id': 458, 'name': 'Green Sport' }, { 'id': 514, 'name': 'Hawkers' }, { 'id': 433, 'name': 'Hercules CF' }, { 'id': 645, 'name': 'Huellas Javi' }, { 'id': 740, 'name': 'Ignacio de la calle' }, { 'id': 500, 'name': 'In and Basic' }, { 'id': 146, 'name': 'Intercalzado' }, { 'id': 364, 'name': 'INT-WhiteGarage' }, { 'id': 655, 'name': 'Ivyl' }, { 'id': 137, 'name': 'Jqpeleteros' }, { 'id': 648, 'name': 'Kelme' }, { 'id': 679, 'name': 'Kondy' }, { 'id': 603, 'name': 'La Liga' }, { 'id': 649, 'name': 'La Liga Store' }, { 'id': 616, 'name': 'Levante U.D.' }, { 'id': 540, 'name': 'Liberitae' }, { 'id': 418, 'name': 'Lola Rey' }, { 'id': 439, 'name': 'Lolita Kids' }, { 'id': 438, 'name': 'Lolita Moda' }, { 'id': 393, 'name': 'Luisipo' }, { 'id': 581, 'name': 'Madaboutsun' }, { 'id': 617, 'name': 'Málaga C.F.' }, { 'id': 496, 'name': 'Maria Cremades' }, { 'id': 739, 'name': 'Mario Rodriguez' }, { 'id': 654, 'name': 'Maroon Velvet' }, { 'id': 236, 'name': 'Marta Corral' }, { 'id': 376, 'name': 'Masaltos' }, { 'id': 660, 'name': 'Matt Elowey' }, { 'id': 504, 'name': 'Mercurio' }, { 'id': 559, 'name': 'Mi talla Mama' }, { 'id': 63, 'name': 'MiniZap' }, { 'id': 557, 'name': 'Mira La Marela' }, { 'id': 555, 'name': 'Miss Cute' }, { 'id': 515, 'name': 'Misshamptons' }, { 'id': 231, 'name': 'Modalia - TEST' }, { 'id': 671, 'name': 'MODALIA-34-SV' }, { 'id': 427, 'name': 'moddoMedia' }, { 'id': 488, 'name': 'Mustang' }, { 'id': 635, 'name': 'Nàstic' }, { 'id': 669, 'name': 'Natural Shoes' }, { 'id': 431, 'name': 'Nichi Seijo' }, { 'id': 691, 'name': 'Nicoli' }, { 'id': 495, 'name': 'Nine West' }, { 'id': 443, 'name': 'Nybilo' }, { 'id': 690, 'name': 'Oceanglasses' }, { 'id': 149, 'name': 'Old Salvador Artesano' }, { 'id': 342, 'name': 'Old_CD Mirandes' }, { 'id': 341, 'name': 'old_CD Numancia' }, { 'id': 339, 'name': 'Old_Rayo Vallecano' }, { 'id': 340, 'name': 'Old_UD Almeria' }, { 'id': 595, 'name': 'old0tazuaold' }, { 'id': 472, 'name': 'oldAztivate' }, { 'id': 353, 'name': 'oldRayo Vallecanoold' }, { 'id': 570, 'name': 'OldRayo VallecanoOld' }, { 'id': 345, 'name': 'oldSteve Maddenold' }, { 'id': 436, 'name': 'Ombak' }, { 'id': 597, 'name': 'Otazua' }, { 'id': 541, 'name': 'Oveja negra' }, { 'id': 516, 'name': 'Paco Cecilio' }, { 'id': 573, 'name': 'Pasion Kikoy' }, { 'id': 378, 'name': 'Pepe Jeans' }, { 'id': 441, 'name': 'Piesanto' }, { 'id': 499, 'name': 'Pink Bull' }, { 'id': 647, 'name': 'Pisamonas' }, { 'id': 435, 'name': 'Privata' }, { 'id': 638, 'name': 'R. Oviedo' }, { 'id': 622, 'name': 'R. Sporting' }, { 'id': 640, 'name': 'R. Valladolid C.F.' }, { 'id': 641, 'name': 'R. Zaragoza' }, { 'id': 610, 'name': 'R.C. Celta' }, { 'id': 611, 'name': 'R.C. Deportivo' }, { 'id': 612, 'name': 'R.C.D. Espanyol' }, { 'id': 634, 'name': 'R.C.D. Mallorca' }, { 'id': 44, 'name': 'Rafael Albero' }, { 'id': 590, 'name': 'Rayo Vallecano' }, { 'id': 618, 'name': 'Real Betis' }, { 'id': 619, 'name': 'Real Madrid' }, { 'id': 620, 'name': 'Real Sociedad' }, { 'id': 266, 'name': 'Resistolhats' }, { 'id': 721, 'name': 'RKS Canarias' }, { 'id': 747, 'name': 'RKS PRE' }, { 'id': 722, 'name': 'RKS Tenerife' }, { 'id': 720, 'name': 'RKS-34-PI' }, { 'id': 62, 'name': 'Rumbo' }, { 'id': 637, 'name': 'S.D. Ponferradina' }, { 'id': 639, 'name': 'S.D. Tenerife' }, { 'id': 709, 'name': 'Salvador Artesanos' }, { 'id': 260, 'name': 'Samsara' }, { 'id': 659, 'name': 'Sapphire Plata' }, { 'id': 298, 'name': 'Sarah Mawen' }, { 'id': 550, 'name': 'Savage Culture' }, { 'id': 598, 'name': 'SD Eibar' }, { 'id': 553, 'name': 'SD Eibar en ingles' }, { 'id': 554, 'name': 'SD Eibar Euskera' }, { 'id': 631, 'name': 'SD Huesca' }, { 'id': 593, 'name': 'Sergio Rodriguez' }, { 'id': 621, 'name': 'Sevilla F.C.' }, { 'id': 538, 'name': 'Shoes and Colors' }, { 'id': 552, 'name': 'Shoes Kids' }, { 'id': 223, 'name': 'Silvio Silvani' }, { 'id': 537, 'name': 'Skechers' }, { 'id': 733, 'name': 'Sport 2000' }, { 'id': 567, 'name': 'Squirrel' }, { 'id': 453, 'name': 'Steve Madden' }, { 'id': 41, 'name': 'Strover' }, { 'id': 521, 'name': 'Strover Rediseno' }, { 'id': 486, 'name': 'Sweet Dreams' }, { 'id': 536, 'name': 'Swissbags' }, { 'id': 492, 'name': 'Syringa Shoes' }, { 'id': 571, 'name': 'Take Me' }, { 'id': 370, 'name': 'TapTapTap' }, { 'id': 526, 'name': 'Thenikkishop' }, { 'id': 601, 'name': 'Tina Godoy' }, { 'id': 265, 'name': 'Tina Godoy_old' }, { 'id': 728, 'name': 'Tino Gonzalez' }, { 'id': 315, 'name': 'Totto' }, { 'id': 449, 'name': 'Toucane' }, { 'id': 734, 'name': 'Tous' }, { 'id': 359, 'name': 'Trends' }, { 'id': 321, 'name': 'Tu Rincon' }, { 'id': 354, 'name': 'U.D. Almería' }, { 'id': 594, 'name': 'U.D. Las Palmas' }, { 'id': 596, 'name': 'U.E. Llagostera' }, { 'id': 503, 'name': 'Under Armour' }, { 'id': 592, 'name': 'Ursulitas' }, { 'id': 673, 'name': 'Vagn Blacs' }, { 'id': 623, 'name': 'Valencia C.F.' }, { 'id': 569, 'name': 'VE.VI.RE' }, { 'id': 451, 'name': 'Veletto' }, { 'id': 556, 'name': 'Victoria' }, { 'id': 624, 'name': 'Villarreal C.F.' }, { 'id': 676, 'name': 'Vulky' }, { 'id': 716, 'name': 'Wanda Panda' }, { 'id': 662, 'name': 'WAU' }, { 'id': 513, 'name': 'Wolfnoir' }, { 'id': 377, 'name': 'Xti' }, { 'id': 511, 'name': 'Zapatos en la Nube' }, { 'id': 363, 'name': 'Zapatosmil' }, { 'id': 287, 'name': 'Zapp' }, { 'id': 497, 'name': 'Zergatik' }];
    this.currSite = this.sites[0];
    this.store.setSite(this.currSite);*/
  }

  onSiteChange() {
    console.log('onSiteChange => ' + JSON.stringify(this.currSite));
    this.store.setSite(this.currSite);
    var route = '/dashboard';
    this.router.navigate([route]);
  }


  logout(): void {
    //this.userService.logout();
  }

}
