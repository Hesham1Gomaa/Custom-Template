import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HomeComponent} from './home/home.component';
import{RouterModule,Routes} from '@angular/router';
import {AboutUsComponent} from './about-us/about-us.component';
import { PagesComponent } from './pages.component';
import {LoginComponent} from './login/login.component';
import{EmployeeComponent} from './employee/employee.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import {ListEmployeeComponent} from './employee/ListEmployees/list.employee.component';
import {AssigEmpToCustomerComponent} from './employee/assig-emp-to-customer/assig-emp-to-customer.component';
import {ListAssigEmpToCustomerComponent} from './employee/list-assig-emp-to-customer/list-assig-emp-to-customer.component';
import {ListPOsComponent} from './po-customer/list-pos/list-pos.component';
import {ListEnvoicesComponent} from './Invoices/list-envoices/list-envoices.component';




import { AddDayRegistrationComponent } from './days.registration/add.registrationDays/add.dayRegistration.component';
import { ListDayRegistrationComponent } from './days.registration/list.daysRegistration/list.dayRegistration.component';
import { EditDayRegistrationComponent } from './days.registration/edit.registrationDays/edit.dayRegistration.component';
import { SettingCustomerComponent } from './settings.pages/setting-customer/setting-customer.component';
import { SettingRoleComponent } from './settings.pages/setting-role/setting-role.component';
import { SettingPaymentTypeComponent } from './settings.pages/setting-payment-type/setting-payment-type.component';
import { SttingContactRoleComponent } from './settings.pages/stting-contact-role/stting-contact-role.component';
import { CustomerEmployeeComponent } from './settings.pages/customer-employee/customer-employee.component';

import { CreateInvoiceComponent } from './Invoices/create-invoice/create-invoice.component';






//import {CreateInvoiceComponent} from './invoice/create-invoice/create-invoice.component'




import {CreatePOCustomerComponent} from './po-customer/create-pocustomer/create-pocustomer.component';
import {PoitemdescroptionComponent} from './po-customer/poitemdescroption/poitemdescroption.component';
import {AssignEmpToPOComponent} from './po-customer/assign-emp-to-po/assign-emp-to-po.component';




const pagesRoutes: Routes = [{
  path:'login',
  component:LoginComponent
},
{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'DashBoard',
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  {
     path:'aboutUs',
     component:AboutUsComponent,
     canActivate: [AuthGuard] 
  },
  {
    path:'employee',
    component:EmployeeComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'listemployee',
    component:ListEmployeeComponent,
    canActivate: [AuthGuard] 
  },
  {
  path:'createPOCustomer',
  component:CreatePOCustomerComponent,
  canActivate: [AuthGuard] 
  }	,
  {
    path:'AssignEmpToPO',
    component:AssignEmpToPOComponent,
    canActivate: [AuthGuard] 
    }	,
  {
  path:'addDayReg',
  component:AddDayRegistrationComponent,
  canActivate: [AuthGuard] 
  }	,
  {
    path:'listDayReg',
    component:ListDayRegistrationComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'editDayReg',
    component:EditDayRegistrationComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'PoItemDesc',
    component:PoitemdescroptionComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'newCustomer',
    component:SettingCustomerComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'newRole',
    component:SettingRoleComponent,
    canActivate: [AuthGuard] 
  }
  ,
  {
    path:'newPaymentType',
    component:SettingPaymentTypeComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'ContactRole',
    component:SttingContactRoleComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'CustomerContact',
    component:CustomerEmployeeComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'CreateInvoice',
    component:CreateInvoiceComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'AssigEmpToCustomer',
    component:AssigEmpToCustomerComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'listAssigEmpToCustomer',
    component:ListAssigEmpToCustomerComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'listPOsComponent',
    component:ListPOsComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'listEnvoicesComponent',
    component:ListEnvoicesComponent,
    canActivate: [AuthGuard] 
  },
]
}];


@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(pagesRoutes)
  ],
  declarations: []
})
export class PagesRoutingModule { }


