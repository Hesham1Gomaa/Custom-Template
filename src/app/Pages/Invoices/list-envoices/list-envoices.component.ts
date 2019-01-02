import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import {employee} from 'src/app/Pages/pages.services/employee.service/employee';
import * as XLSX from 'ts-xlsx';
import {PageEvent} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { debug } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import {InvoicesService} from 'src/app/Pages/pages.services/invoices/invoices.service';
import { Message } from 'primeng/components/common/api';



@Component({
  selector: 'app-list-envoices',
  templateUrl: './list-envoices.component.html',
  styleUrls: ['./list-envoices.component.css']
})
export class ListEnvoicesComponent implements OnInit {
  
  displayedColumns: string[] = ['invoiceNo', 'invoiceDate', 'amount','ponoCreation','Payment'];
  dataSource: MatTableDataSource<any>;
  invoices:any[]=[];
  checkEdit:boolean = false;
  paymentForm:FormGroup;
  msgs: Message[];
  submitted: boolean = false;



  constructor(private router: Router, private spinner: NgxSpinnerService,private formBuilder: FormBuilder,private InvoiceService: InvoicesService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.spinner.show();
    localStorage.removeItem("editInvoice");

    this.paymentForm = this.formBuilder.group({
      id:0,
      InvoiceId:[],
      invoiceNo:[,Validators.required],
      Status:[],
      InvoiceDate:[]
    });



  this.InvoiceService.GetAllInvoice().subscribe(data=>{
      debugger;
      this.invoices=data;
      if(data!=null){
    //this.length = this.emps.length;
    this.dataSource = new MatTableDataSource(data);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.spinner.hide();

      }
   });

  }

  addInoive(): void {
    this.router.navigate(['CreateInvoice']);
  };

  editInvice(Invoice:any): void {
    debugger;
    localStorage.removeItem("editInvoice");
    localStorage.setItem("editInvoice", Invoice.id.toString());
    this.router.navigate(['CreateInvoice']);
  };


  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editInvoicePayment(Invoice){
    debugger;
    this.checkEdit = true;
    this.paymentForm.controls['invoiceNo'].setValue(Invoice.invoiceNo);
    this.paymentForm.controls['InvoiceId'].setValue(Invoice.id);
    this.paymentForm.controls['Status'].setValue(Invoice.status);

    this.paymentForm.patchValue({
      InvoiceDate:Invoice.invoiceDate
      });


  };

  Cancel(){
    this.checkEdit = false;

  }
  
  changeInvoiceStatus(){
    this.submitted = true;

       // stop here if form is invalid
       if (this.paymentForm.invalid) {
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please Enter Role Name <br/>'
        });
           return;
      };

      this.InvoiceService.updtaeInvoiceStatus(this.paymentForm.value).subscribe(data => {
        debugger;
        if (data.isSuccess==true) {
          
          this.msgs = [];
          this.checkEdit = false;
          this.msgs.push({
            severity: 'success',
            summary: data.message
          })

          this.InvoiceService.GetAllInvoice().subscribe(data=>{
            debugger;
            this.invoices=data;
            if(data!=null){
          //this.length = this.emps.length;
          this.dataSource = new MatTableDataSource(data);
          setTimeout(() => this.dataSource.paginator = this.paginator);
          this.spinner.hide();
      
            }
         });
        }
      });
  };

}
