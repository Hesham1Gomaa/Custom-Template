import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainSidebarComponent } from './Components/main-sidebar/main-sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PagesRoutingModule } from '../Pages/pages-routing.module'
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    PagesRoutingModule,
    RouterModule,
    TranslateModule,
    MatSlideToggleModule,
  ],
  declarations: [HeaderComponent, FooterComponent, MainSidebarComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainSidebarComponent,
    MatSlideToggleModule

  ]
})
export class LayoutModule_local { }
