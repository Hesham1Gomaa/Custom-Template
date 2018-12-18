import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PaymentTypeService} from 'src/app/Pages/pages.services/settings.services/paymentType/payment-type.service';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-setting-payment-type',
  templateUrl: './setting-payment-type.component.html',
  styleUrls: ['./setting-payment-type.component.css']
})
export class SettingPaymentTypeComponent implements OnInit {

  constructor(private PaymentService: PaymentTypeService, private formBuilder: FormBuilder, private router: Router) {
    this.PaymentService.GetAllPayment().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  addPaymentForm:FormGroup;
  submitted:boolean=false;
  displayedColumns: string[] = ['paymentTypeName','actions'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  title = 'Add Payment Type'
  checkAdd: boolean = false;
  objEdit: any
  checkEdit: boolean = false;
  msgs: Message[];
  ngOnInit() {
    this.addPaymentForm = this.formBuilder.group({
      id: 0,
      paymentTypeName: [, Validators.required],
      active: true
    });

  
  }

  get f() { 
    return this.addPaymentForm.controls; }

    AddPayment(){
      this.submitted = true;
   debugger;
   
       // stop here if form is invalid
      if (this.addPaymentForm.invalid) {
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please Enter All fileds Required <br/>'
        });
         return;
      }
     
      this.addPaymentForm.value.id = this.addPaymentForm.value.id == null ? this.addPaymentForm.value.id = 0 : this.addPaymentForm.value.id
       debugger;
       this.PaymentService.AddPaymentType(this.addPaymentForm.value).subscribe(data=>{
         if (data.message == "Adding Payment Sucessful") {
           this.dataSource.data.push(this.addPaymentForm.value);
           this.dataSource.paginator = this.paginator;

           this.msgs = [];
           this.msgs.push({
             severity: 'success',
             summary: data.message
           });
          
         }
         else if (data.message == "Edit Payment Sucessful") {
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
         
         }
         else {
           this.msgs.push({
             severity: 'error',
             summary: data.message
           });

         }
         this.checkAdd = false;
         this.checkEdit = false;
         this.submitted = false;
       })
       }
   
       applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      };

      Delete(payment){
        debugger;
        let index = this.dataSource.data.findIndex((item) => {
          return item.id == payment.id
        });
      
        this.PaymentService.DeletPaymnet(payment).subscribe(data=>{
          debugger;
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
    this.title = "Add Payment Type";
    // if (this.title == "Edit title")
    this.checkAdd = !this.checkAdd;
    this.addPaymentForm.reset();
    this.submitted = false;

  }

  Cancel() {
    this.submitted = false;
    this.checkAdd = false;
    this.checkEdit = false;
  }
  Edit(obj) {
    debugger;
    this.title = "Edit Payment Type"
    this.objEdit = obj;
    this.checkEdit = true;
    this.submitted = false;
    this.addPaymentForm.setValue(obj);
  }
}
