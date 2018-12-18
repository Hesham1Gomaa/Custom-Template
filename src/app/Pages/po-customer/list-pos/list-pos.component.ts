import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import {employee} from 'src/app/Pages/pages.services/employee.service/employee';
import * as XLSX from 'ts-xlsx';
import {PageEvent} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { debug } from 'util';
import {AssignEmpTopoService} from 'src/app/Pages/pages.services/AssignEmpToPO/assign-emp-topo.service';


import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-list-pos',
  templateUrl: './list-pos.component.html',
  styleUrls: ['./list-pos.component.css']
})

export class ListPOsComponent implements OnInit {

  displayedColumns: string[] = ['ponoCreation', 'customerId','actions'];
  dataSource: MatTableDataSource<any>;
  arrayBuffer:any;
  customers:any;
  allPOs:any[]=[];



  constructor(private formBuilder: FormBuilder,private router: Router, private spinner: NgxSpinnerService,private POService:AssignEmpTopoService,private employeeService:EmployeeService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

  localStorage.removeItem("POId");
  this.spinner.show();

   this.employeeService.getAllcustomers().subscribe(data=>{
   this.customers=data;
     console.log(data);
  });

  this.POService.GettAllPOs().subscribe(data=>{
      debugger;
      
    this.allPOs = data;
    this.dataSource = new MatTableDataSource(this.allPOs);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.spinner.hide();

   });
  }

  addNewPO(): void {
    this.router.navigate(['createPOCustomer']);
  };

  editPO(po:any): void {
    debugger;
    localStorage.removeItem("POId");
    localStorage.setItem("POId", po.id.toString());
    this.router.navigate(['createPOCustomer']);
  };


  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
