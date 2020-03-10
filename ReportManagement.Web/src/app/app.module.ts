import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import ngx-translate and http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportModule } from './report/report.module';
import { CommonService } from 'src/services/common.services';
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpInterceptorService } from 'src/services/http-interceptor.service';
import { ErrorInterceptorService } from 'src/services/error-interceptor.service';

// import application modules and components
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { LoginComponent } from './common/login/login.component';
import { LandingPageComponent } from './common/landing-page/landing-page.component';

import { UserModule } from './user/user.module';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    LandingPageComponent,
    AdminHomeComponent
  ],
  imports: [
    UserModule,
    ReportModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    // configure translate module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CommonService, AuthenticationService, {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
