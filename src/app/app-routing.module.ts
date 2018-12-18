import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{PagesRoutingModule}from './Pages/pages-routing.module';
import{RouterModule,Routes} from '@angular/router';
import{LoginComponent}from './pages/login/login.component';


//  const routes: Routes = [{
//   path: 'login',
//   component: LoginComponent}];

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    // RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }



