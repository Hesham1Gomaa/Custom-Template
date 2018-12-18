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
  selector: 'app-listemployee',
  templateUrl: './list.employee.component.html',
  styleUrls: ['./list.employee.component.css']
})
export class ListEmployeeComponent implements OnInit {



  emps:any[]=[];

  customers:any;
  Mangers:any;
  TLs:any;
  DPs:any;
  Pays:any;
  displayedColumns: string[] = ['empCode', 'empName', 'email', 'mobile','actions'];
  dataSource: MatTableDataSource<any>;
  arrayBuffer:any;
  file:File;
  // MatPaginator Output
  pageEvent: PageEvent;
  
  constructor( private formBuilder: FormBuilder,private router: Router, private spinner: NgxSpinnerService,private employeeService:EmployeeService) { 
    
  }

 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.spinner.show();
 
    // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 5000);

    localStorage.removeItem("editEmpId");
  // this.employeeService.getAllMangs().subscribe(data=>{
  //   this.Mangers=data;
  //   console.log(data);
  // });
  
  // this.employeeService.getAllcustomers().subscribe(data=>{
  //   this.customers=data;
  //   console.log(data);
  // });
  // this.employeeService.getAllTL().subscribe(data=>{
  //   this.TLs=data;
  //   console.log(data);
  // });

  
  // this.employeeService.getAllDeps().subscribe(data=>{
  //   this.DPs=data;
  //   console.log(data);
  // });

  this.employeeService.getAllPayments().subscribe(data=>{
    this.Pays=data;
    console.log(data);
  });

  this.employeeService.getAllEmps().subscribe(data=>{
    debugger;
   this.emps=data;
    
  //this.length = this.emps.length;
  this.dataSource = new MatTableDataSource(this.emps);
  setTimeout(() => this.dataSource.paginator = this.paginator);
  // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 5000);
  this.spinner.hide();
  //this.dataSource.paginator = this.paginator;
  //  console.log(data);
 });

  }

  addEmp(): void {
    this.router.navigate(['employee']);
  };

  editUser(emp:any): void {
    debugger;
    localStorage.removeItem("editEmpId");
    localStorage.setItem("editEmpId", emp.id.toString());
    this.router.navigate(['employee']);
  };
  

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
      this.employeeService.addBulkEmps(object).subscribe(data=>{
        debugger;

        this.employeeService.getAllEmps().subscribe(data=>{
          debugger;
          this.emps=data;
          
        //this.length = this.emps.length;
        this.dataSource = new MatTableDataSource(this.emps);
        this.dataSource.paginator = this.paginator;
          console.log(data);
        });
        
      });
    }
    var file= fileReader.readAsArrayBuffer(this.file);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };  
}



}
