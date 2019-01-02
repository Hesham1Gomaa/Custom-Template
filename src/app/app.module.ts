import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PagesModule } from './Pages/pages.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
      '.json'
  ); */
 return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    AppRoutingModule,
    RouterModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  // tslint:disable-next-line:no-trailing-whitespace
  }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
