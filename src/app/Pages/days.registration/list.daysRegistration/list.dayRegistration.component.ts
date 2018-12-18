import { Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import {DaysregistrationService} from 'src/app/Pages/pages.services/days.registration/daysregistration.service';
import {employee} from 'src/app/Pages/pages.services/employee.service/employee'
import { NgxSpinnerService } from 'ngx-spinner';
import {PageEvent} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-list-dayreg',
  templateUrl: './list.dayRegistration.component.html',
  styleUrls: ['./list.dayRegistration.component.css']
})
export class ListDayRegistrationComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,private router: Router, private spinner: NgxSpinnerService,private DaysRegservice:DaysregistrationService, private employeeService:EmployeeService) { }
   months:any[]=[];
   dayesRegList:any[] = [];
   emps:employee[]=[];
   addForm:FormGroup;
   customers:any;
   Mangers:any;
   TLs:any;
   customer:any;
   Manger:any;
   TL:any;
   pageEvent: PageEvent;

   @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    debugger;
    this.spinner.show();

    localStorage.removeItem("editEmpIdregday");

this.DaysRegservice.GetDaysReg().subscribe(data=>{
  this.dayesRegList=data;
   this.spinner.hide();

 });

this.employeeService.getAllEmps().subscribe(data=>{
     this.emps=data;
   });

this.employeeService.getAllMangs().subscribe(data=>{
    this.Mangers=data;
  });
  
   this.employeeService.getAllcustomers().subscribe(data=>{
    this.customers=data;
  });
  this.employeeService.getAllTL().subscribe(data=>{
    this.TLs=data;
  });

  this.months=['Jan','Fab','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  }
  addEmpDayReg(){
  this.router.navigate(['addDayReg']);
  };

  // editEmpDayReg(empdays){

  // }

  editEmpDayReg(empdays:any): void {
     localStorage.removeItem("editEmpIdregday");
    localStorage.setItem("editEmpIdregday", empdays.id.toString());
    this.router.navigate(['addDayReg']);
   };


}


  

