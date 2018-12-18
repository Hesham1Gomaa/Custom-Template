import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CustomerSettingService } from 'src/app/Pages/pages.services/settings.services/customer/customer-setting.service';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-setting-customer',
  templateUrl: './setting-customer.component.html',
  styleUrls: ['./setting-customer.component.css']
})
export class SettingCustomerComponent implements OnInit {

  addCustomerForm: FormGroup;
  submitted: boolean = false;
  displayedColumns: string[] = ['customerCode', 'customerName','active', 'actions'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'Add Customer'
  checkAdd: boolean = false;
  objEdit: any
  checkEdit: boolean = false;
  msgs: Message[];
  constructor(private CreatecustomerService: CustomerSettingService, private formBuilder: FormBuilder, private router: Router) {
    this.CreatecustomerService.GetAllCustomers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  
  }


  ngOnInit() {
    debugger;
    this.addCustomerForm = this.formBuilder.group({
      id: 0,
      customerCode: [, Validators.required],
      customerName: [, Validators.required],
      active: true
    });
    

  
    this.addCustomerForm.controls['active'].setValue(true);
   
    let obj = this.addCustomerForm.get('active').value
  }



  Addcustmer() {
    this.submitted = true;
 //   debugger;

    // stop here if form is invalid
    if (this.addCustomerForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Enter All fileds Required <br/>'
      });
      return;
    }
    this.CreatecustomerService.AddCustomer(this.addCustomerForm.value).subscribe(data => {
   //   debugger;
      if (data.message == "Adding Customer Sucessful") {
        this.dataSource.data.push(data.obj);
        this.dataSource.paginator = this.paginator;

        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: data.message
        });
        this.checkAdd = false;
        this.submitted = false;
      }
      else if (data.message == "Edit Customer Sucessful") {
        let index = this.dataSource.data.findIndex((item) => {
          return item.id == this.objEdit.id
        });
        this.dataSource.data[index] = data.obj
        this.dataSource.paginator = this.paginator;
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: data.message
        });
        this.checkEdit = false;
      }
      else {
        this.msgs.push({
          severity: 'error',
          summary: data.message
        });

      }
    })
  }

  Edit(obj) {
    this.title = "Edit Customer"
    this.objEdit = obj;
    this.checkEdit = true;
    this.addCustomerForm.setValue(obj);
  }
  Delete(cust) {
  //  debugger;
    let index = this.dataSource.data.findIndex((item) => {
      return item.id == cust.id
    });
    this.CreatecustomerService.DeleteCustomer(cust).subscribe(data => {
  //    debugger;
      if (data.message == "Delete Object Successful") {
        this.dataSource.data.splice(index, 1);
        this.dataSource.paginator = this.paginator;
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: data.message
        });
      }
      else {

        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: data.message
        });
      }
    })
  };
  addPanel() {
    this.title = "Add Customer";
   // if (this.title == "Edit title")
      this.checkAdd = !this.checkAdd;
    this.addCustomerForm.reset();
    this.addCustomerForm.get('active').setValue(true);
    this.submitted = false;

  }
  Cancel() {

    this.checkAdd = false;
    this.checkEdit = false;
    this.addCustomerForm.reset();
    this.addCustomerForm.get('active').setValue(true);
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  get f() {
    return this.addCustomerForm.controls;
  }
  get active() { return this.addCustomerForm.get('active') }

}
