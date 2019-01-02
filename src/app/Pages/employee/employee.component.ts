import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../pages.services/employee.service/employee.service'
import { employee } from '../pages.services/employee.service/employee';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  emps:employee[]=[];
  employee:employee={};
  empId:number;
  addForm: FormGroup;
  editable:boolean=false;
  customers:any;
  Mangers:any;
  TLs:any;
  DPs:any;
  Pays:any;
  roles:any;  
  msgs: Message[];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor( private formBuilder: FormBuilder,private router: Router, private employeeService:EmployeeService) { 
    
  }

 

  ngOnInit() {
    let empId = localStorage.getItem("editEmpId");
    if(empId) {
      this.editable=true;
      this.employeeService.getEmpID(+empId).subscribe( data => {
      debugger;

        this.addForm.setValue(data);
      });
    }


    this.addForm = this.formBuilder.group({
      id:[],
      empCode:[,Validators.required],
      empName: ['', Validators.required],
      hiringDate: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      salary: [, Validators.required],
      hourCost: [, Validators.required],
      // customerId: [, Validators.required],
      // departmentId: [, Validators.required],
      // manegar: [, Validators.required],
      // teamLeader: [, Validators.required],
      paymentTypeId: [, Validators.required],
      bankAccountNo: ['', Validators.required],
      rate: [, Validators.required],
      image: [],
      // overHeadAmount:[,Validators.required],
      // allowanceAmount: [,Validators.required],
      // overTimeAmount: [,Validators.required],
      // roleId:[,Validators.required],
      salaryActivatDate:[,Validators.required]
    });


  this.employeeService.getAllcustomers().subscribe(data=>{
    this.customers=data;
    console.log(data);
  });

  this.employeeService.getAllMangs().subscribe(data=>{
    this.Mangers=data;
    console.log(data);
  });
 this.employeeService.getAllRoles().subscribe(data=>{
this.roles=data;
 });

  this.employeeService.getAllTL().subscribe(data=>{
    this.TLs=data;
    console.log(data);
  });

  
  this.employeeService.getAllDeps().subscribe(data=>{
    this.DPs=data;
    console.log(data);
  });

  this.employeeService.getAllPayments().subscribe(data=>{
    debugger;
    this.Pays=data;
    console.log(data);
  });
  // this.employeeService.getEmp(this.empId).subscribe(data=>{
  //   this.employee=data;
  // });

  }

  submitForm(type){
    if(!this.editable)
      this.ADDEmp();
    else
      this.UpdateEmp();
  }

  ADDEmp() {
    debugger;
    this.addForm.value.id = -1;
    this.addForm.value.image = ' ';

    if(this.addForm.invalid){
      this.msgs = [];
      this.msgs.push({
          severity: 'error', 
          summary: 'Error Message', 
          detail: 'Please Fill All Required Data <br/>'
      });
    }
    else{
        this.employeeService.AddEmp(this.addForm.value).subscribe(data=>{
          if(data.isSuccess){
              this.employee=data;
              this.msgs = [];
              this.msgs.push({
                  severity: 'success', 
                  summary: 'Success Message', 
                  detail: 'Employee Added successfuly!.'
              });
              // this.router.navigate(['listemployee']);
            this.addForm.reset();
          }
          else{
            this.msgs = [];
            this.msgs.push({
                severity: 'error', 
                summary: 'Error Message', 
                detail: 'Error While Adding!.<br/>'+data.message
            });
          }

        })
    }
    
  }


  UpdateEmp(){
   
    this.employeeService.updateEmp(this.addForm.value.id,this.addForm.value).subscribe(data=>{
      
      this.employee=data;
      this.msgs = [];
      this.msgs.push({
          severity: 'success', 
          summary: 'Success Message', 
          detail: 'Employee Updaed successfuly!.'
      });
      // this.router.navigate(['listemployee']);
      this.addForm.reset();
    })

  }

 



}
