import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HomeComponent}from './home/home.component'
import{ LayoutModule_local} from '../@layout/layout.module';
import{PagesComponent}from './pages.component'
import{LoginComponent}from './login/login.component'
import {ListEmployeeComponent} from './employee/ListEmployees/list.employee.component'
import{PagesRoutingModule}from './pages-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import{RouterModule} from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddDayRegistrationComponent } from './days.registration/add.registrationDays/add.dayRegistration.component';
import { ListDayRegistrationComponent } from './days.registration/list.daysRegistration/list.dayRegistration.component';
import { EditDayRegistrationComponent } from './days.registration/edit.registrationDays/edit.dayRegistration.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { CreatePOCustomerComponent } from './po-customer/create-pocustomer/create-pocustomer.component';

import { HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }from '@angular/forms';
import { EmpPipePipe } from '../pipes/empPipe/emp-pipe.pipe';
import { empCustomPipe } from '../pipes/empPipe/emp-customer.pipe';
import { empTLPipe } from '../pipes/empPipe/emp-TeamLeader.pipe';
import { empDpPipe } from '../pipes/empPipe/emp-dept-pipe';


// import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatExpansionModule, MatDialogModule,MatTabsModule, MatButtonModule, MatIconModule,MatCheckboxModule, MatSlideToggleModule} from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
 

import { PanelModule,ButtonModule,AccordionModule,RadioButtonModule} from 'primeng/primeng';
import { FieldsetModule } from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { TableModule } from 'primeng/table';
import { from } from 'rxjs';
import { PoItemComponent } from './component/po-item/po-item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AssignEmpToPOComponent } from './po-customer/assign-emp-to-po/assign-emp-to-po.component';
import { PoitemdescroptionComponent } from './po-customer/poitemdescroption/poitemdescroption.component';
import { SettingCustomerComponent } from './settings.pages/setting-customer/setting-customer.component';
import { SettingRoleComponent } from './settings.pages/setting-role/setting-role.component';
import { SettingPaymentTypeComponent } from './settings.pages/setting-payment-type/setting-payment-type.component';
import { SttingContactRoleComponent } from './settings.pages/stting-contact-role/stting-contact-role.component';
import { CustomerEmployeeComponent } from './settings.pages/customer-employee/customer-employee.component';
import { CreateInvoiceComponent } from './Invoices/create-invoice/create-invoice.component';
import { AssigEmpToCustomerComponent } from './employee/assig-emp-to-customer/assig-emp-to-customer.component';
import { ListAssigEmpToCustomerComponent } from './employee/list-assig-emp-to-customer/list-assig-emp-to-customer.component';
import { ListPOsComponent } from './po-customer/list-pos/list-pos.component';
//import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { TranslateModule } from '@ngx-translate/core';
import { ListEnvoicesComponent } from './Invoices/list-envoices/list-envoices.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule_local,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    MatSnackBarModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    FieldsetModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    TranslateModule,
    GrowlModule,
    TabViewModule,
    TableModule,
    MatSlideToggleModule,
    ToggleButtonModule,
    CheckboxModule,
    FileUploadModule
    ],
  declarations: [
    PagesComponent,
    HomeComponent,
    AboutUsComponent,
    LoginComponent,
    EmployeeComponent,
    AddDayRegistrationComponent,
    CreatePOCustomerComponent,
    ListEmployeeComponent,
    ListDayRegistrationComponent,
    EditDayRegistrationComponent,
    EmpPipePipe,
    empCustomPipe,
    empDpPipe,
    empTLPipe,
    PoItemComponent,
    InvoiceComponent,
    AssignEmpToPOComponent,
    PoitemdescroptionComponent,
    SettingCustomerComponent,
    SettingRoleComponent,
    SettingPaymentTypeComponent,
    SttingContactRoleComponent,
    CustomerEmployeeComponent,
    CreateInvoiceComponent,
    AssigEmpToCustomerComponent,
    ListAssigEmpToCustomerComponent,
    ListPOsComponent,
    ListEnvoicesComponent
   
  ],
  exports: [
   HomeComponent,
   AboutUsComponent,
   PagesComponent,
   LoginComponent,
   EmployeeComponent,
   CreatePOCustomerComponent,
   FormsModule,
   ReactiveFormsModule,
   ListEmployeeComponent,
   AddDayRegistrationComponent,
   ListDayRegistrationComponent,
    EditDayRegistrationComponent,
    MatSlideToggleModule
  ],
  providers: [
    AuthGuard]
 
})
export class PagesModule { }

