import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import ngx-translate and http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReportModule } from './report/report.module';
import { CommonService } from 'src/services/common.services';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserProfileCreateComponent } from './user/user-profile-create/user-profile-create.component';
import { UserProfileEditComponent } from './user/user-profile-edit/user-profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    UserProfileCreateComponent,
    UserProfileEditComponent,
  ],
  imports: [
    ReportModule,
    BrowserModule,
    AppRoutingModule,
    
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
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
