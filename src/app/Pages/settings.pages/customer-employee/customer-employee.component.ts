import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactRoleService} from 'src/app/Pages/pages.services/settings.services/ContactRole/contact-role.service';
import {SettingCustomerEmployeeService} from 'src/app/Pages/pages.services/settings.services/customerEmployee/setting-customer-employee.service';

import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import { Message, ConfirmationService } from 'primeng/components/common/api';



@Component({
  selector: 'app-customer-employee',
  templateUrl: './customer-employee.component.html',
  styleUrls: ['./customer-employee.component.css']
})
export class CustomerEmployeeComponent implements OnInit {

    addCustomerContactForm:FormGroup;
    submitted:boolean=false;

    custRoles:any[]=[];
    customers:any[]=[];
    msgs: Message[];

    constructor(private cutomerRolService:ContactRoleService,private employeeService:EmployeeService,
      private formBuilder: FormBuilder,private router: Router,private CustomerEmployeeService:SettingCustomerEmployeeService) { }

      ngOnInit() {

        this.addCustomerContactForm = this.formBuilder.group({
          ContactName:[,Validators.required],
          ContactRoleId:[,Validators.required],
          CustomerId:[,Validators.required],
          ContactMobile:[,Validators.required]
        });

      this.cutomerRolService.GetAllContactRoles().subscribe(data=>{
        this.custRoles=data;
      });

      
      this.employeeService.getAllcustomers().subscribe(data=>{
        this.customers=data;
        console.log(data);
      });



      }

      get f() { 
        return this.addCustomerContactForm.controls;
      }

      AddcustmerContact(){
        this.submitted = true;
        // stop here if form is invalid
        if (this.addCustomerContactForm.invalid) {
            this.msgs = [];
            this.msgs.push({
                severity: 'error', 
                summary: 'Error Message', 
                detail: 'Please Fill All Required Data <br/>'
            });
        }
        else {   
            this.CustomerEmployeeService.AddCustomerContact(this.addCustomerContactForm.value).subscribe(data=>{
                this.msgs = [];
                this.msgs.push({
                    severity: 'success', 
                    summary: 'Success Message', 
                    detail: 'Sucessful customer Contact.'
                });
            })
        }
      }
}
