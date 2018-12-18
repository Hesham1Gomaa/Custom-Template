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





@Component({
  selector: 'app-list-assig-emp-to-customer',
  templateUrl: './list-assig-emp-to-customer.component.html',
  styleUrls: ['./list-assig-emp-to-customer.component.css']
})
export class ListAssigEmpToCustomerComponent implements OnInit {

  displayedColumns: string[] = ['empName', 'customerName', 'fromDt', 'toDt','actions'];
  dataSource: MatTableDataSource<any>;
  arrayBuffer:any;
  file:File;
  emps:any[]=[];

  constructor( private formBuilder: FormBuilder,private router: Router, private spinner: NgxSpinnerService,private employeeService:EmployeeService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.spinner.show();

    localStorage.removeItem("editCustEmpId");

    this.employeeService.getAllEmpscust().subscribe(data=>{
      debugger;
     this.emps=data;
      
    //this.length = this.emps.length;
    this.dataSource = new MatTableDataSource(this.emps);
    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.spinner.hide();

    //this.dataSource.paginator = this.paginator;
    //  console.log(data);
   });

  }

  assigEmpTocust(): void {
    this.router.navigate(['AssigEmpToCustomer']);
  };

  editUser(emp:any): void {
    debugger;
    localStorage.removeItem("editCustEmpId");
    localStorage.setItem("editCustEmpId", emp.id.toString());
    this.router.navigate(['AssigEmpToCustomer']);
  };

  incomingfile(event) 
  {
    debugger;
  this.file= event.target.files[0]; 
  }

  Upload(event) {
    this.file= event["files"][0]; 
    let fileReader = new FileReader();

      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          debugger;
          var object=XLSX.utils.sheet_to_json(worksheet,{raw:false});
          this.employeeService.addBulkAssignedEmps(object).subscribe(data=>{
            debugger;

            this.employeeService.getAllEmpscust().subscribe(data=>{
              debugger;
             this.emps=data;
              
            //this.length = this.emps.length;
            this.dataSource = new MatTableDataSource(this.emps);
            this.dataSource.paginator = this.paginator;
             console.log(data);
           });
           
          });
          debugger;
      }
     var file= fileReader.readAsArrayBuffer(this.file);
     this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };  
}

}
