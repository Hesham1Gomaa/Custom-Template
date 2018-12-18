import { Component, OnInit } from '@angular/core';
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Message, ConfirmationService } from 'primeng/components/common/api';


@Component({
  selector: 'app-assig-emp-to-customer',
  templateUrl: './assig-emp-to-customer.component.html',
  styleUrls: ['./assig-emp-to-customer.component.css']
})
export class AssigEmpToCustomerComponent implements OnInit {

  assignempcusForm:FormGroup;
  editable:boolean=false;
  emps:any;
  customers:any;
  Mangers:any;
  TLs:any;
  msgs: Message[];




  constructor( private formBuilder: FormBuilder,private router: Router, private employeeService:EmployeeService) { }

  ngOnInit() {

    let empId = localStorage.getItem("editCustEmpId");
    if(empId) {
      this.editable=true;
      this.employeeService.getEmpCustID(+empId).subscribe( data => {
      debugger;

        this.assignempcusForm.setValue(data);
      });
    };

    this.assignempcusForm = this.formBuilder.group({
      id:[],
      empId:[,Validators.required],
      customerId:[,Validators.required],
      manegar: [, Validators.required],
      teamLeader: [, Validators.required],
      fromDt: ['', Validators.required],
      toDt: [, Validators.required],
      overHeadAmount:[,Validators.required],
      allowanceAmount: [,Validators.required],
      overTimeAmount: [,Validators.required],
    });

    this.employeeService.getAllEmps().subscribe(data=>{
      this.emps=data;
    });

    this.employeeService.getAllcustomers().subscribe(data=>{
      this.customers=data;
      console.log(data);
    });

    this.employeeService.getAllMangs().subscribe(data=>{
      this.Mangers=data;
      console.log(data);
    });

    this.employeeService.getAllTL().subscribe(data=>{
      this.TLs=data;
      console.log(data);
    });

  };

  submitForm(type){
    if(!this.editable)
      this.ADDEmp();
    else
      this.UpdateEmp();
  };

  
  ADDEmp() {
    debugger;
    if (this.assignempcusForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Fill All Required Data <br/>'
      });
      return;
    }
    this.assignempcusForm.value.id = -1;
      this.employeeService.AssignEmpToCust(this.assignempcusForm.value).subscribe(data=>{
        console.log(data);
        //this.employee=data;
        this.msgs = [];
        this.msgs.push({
            severity: 'success', 
            summary: 'Success Message', 
            detail: 'Employee Added successfuly!.'
        });
        this.router.navigate(['listAssigEmpToCustomer']);
      })
  }


  UpdateEmp() {
    if (this.assignempcusForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Fill All Required Data <br/>'
      });
      return;
    }
   
    this.employeeService.updateAssignedEmp(this.assignempcusForm.value.id,this.assignempcusForm.value).subscribe(data=>{
      
     // this.employee=data;
      this.msgs = [];
      this.msgs.push({
          severity: 'success', 
          summary: 'Success Message', 
          detail: 'Employee Updaed successfuly!.'
      });
      this.router.navigate(['listAssigEmpToCustomer']);
    })

  }

  

}
