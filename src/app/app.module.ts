import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import 'hammerjs';
// app


import { AppRoutingModule } from './app-routing.module';

import { HermesService } from './shared/hermes.service';
import { StoreService } from './shared/store.service';

import { environment } from './../environments/environment';

import { CoreModule } from 'app/core/core.module';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

// Pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipes';

// Widgets
import { AppHeaderComponent } from './widgets/app-header';
import { LogoComponent } from './widgets/logo';
import { AppFooterComponent } from './widgets/app-footer';
import { MenuAsideComponent } from './widgets/menu-aside';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';
import { ComponentLoaderComponent } from './widgets/component-loader';
import { LogoutBoxComponent } from './widgets/logout-box';

// Services

import { UserService } from './services/user.service';
import { MenuService } from './services/menu.service';
import { LogoService } from './services/logo.service';
import { FooterService } from './services/footer.service';
import { MessagesService } from './services/messages.service';
import { CanActivateGuard } from './services/can-activate-guard.service';
import { NotificationsService } from './services/notifications.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { TranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';
import { ExportFileService } from './services/export-file.service';

// les layouts
import { LayoutAuthComponent } from './layouts/auth/auth';
import { LayoutLoginComponent } from './layouts/login/login.component';
import { LayoutRegisterComponent } from './layouts/register/register.component';

// Our Components
import { AppComponent } from './app.component';

// les pages

import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { routing } from 'app/app.routes';
import { AuthModule } from 'app/pages/auth/auth.module';
import { DndModule } from 'ng2-dnd';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const pages = [

];


if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    // PIPES
    SafeHtmlPipe,
    // WIDGETS
    BreadcrumbComponent,
    AppHeaderComponent,
    LogoComponent,
    AppFooterComponent,
    MenuAsideComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent,
    ComponentLoaderComponent,
    LogoutBoxComponent,
    // LAYOUTS
    LayoutAuthComponent,
    LayoutLoginComponent,
    LayoutRegisterComponent,

    // OurComponents
    AppComponent,
    ...pages,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ToasterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    DndModule.forRoot(),
    // AppRoutingModule
    routing
    , AuthModule
  ],
  providers: [
    // SERVICES
    UserService,
    MenuService,
    LogoService,
    FooterService,
    BreadcrumbService,
    MessagesService,
    CanActivateGuard,
    NotificationsService,
    TranslateService,
    ExportFileService,
    LoggerService,
    HermesService, 
    StoreService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
