import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import {DaysregistrationService} from 'src/app/Pages/pages.services/days.registration/daysregistration.service';
import {MatSnackBar} from '@angular/material';
import {employee} from 'src/app/Pages/pages.services/employee.service/employee'
import { Message, ConfirmationService } from 'primeng/components/common/api';
import {AssignEmpTopoService} from 'src/app/Pages/pages.services/AssignEmpToPO/assign-emp-topo.service';



@Component({
  selector: 'app-edit-dayreg',
  templateUrl: './edit.dayRegistration.component.html',
  styleUrls: ['./edit.dayRegistration.component.css']
})
export class EditDayRegistrationComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,private formBuilder: FormBuilder,private router: Router, private AssignedService:AssignEmpTopoService,private DaysReg:DaysregistrationService, private employeeService:EmployeeService) { }
   months:any[]=[];
   msgs: Message[];
 
   emps:employee[]=[];
   editForm:FormGroup;
   customers:any;
   Mangers:any;
   TLs:any;

recObj:any;
   customer:any;
   Manger:any;
   TL:any;


  
   receiveObject($event) {
     debugger;
    this.recObj = $event
  }
   
  ngOnInit() {

    
    let empId = localStorage.getItem("editEmpIdregday");

    


    this.editForm = this.formBuilder.group({
      id:[],
      empId:[,Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      empDays: ['', Validators.required],
      approvedDays: ['', Validators.required],
      overTimeDays: ['', Validators.required],
      approvedOverTimeDays: ['', Validators.required]      

    });

        
  this.DaysReg.GetDayRegByEmpId(+empId).subscribe( data => {
   
    var Obj={
      id:data.id,
    empId:data.empId,
    from:data.from,
    to:data.to,
    empDays:data.empDays,
    approvedDays:data.approvedDays,
    overTimeDays:data.overTimeDays,
    approvedOverTimeDays:data.approvedOverTimeDays
  };

    this.editForm.setValue(Obj);
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

  this.AssignedService.GetEmpAssignedId(+empId).subscribe(data=>{
        data;    
        var indecust=this.customers.findIndex(item=>item.id==data.customerId);
        if(indecust > -1){
          this.customer=this.customers[indecust].customerName;
          var indeMAng=this.Mangers.findIndex(item=>item.id==data.manegar);
          this.Manger=this.Mangers[indeMAng].contactName;
          var indeTL=this.TLs.findIndex(item=>item.id==data.teamLeader);
          this.TL=this.TLs[indeTL].contactName;
        }
    
    
    
      });

}


Update_Days() {
    this.DaysReg.updateDaysReg(this.editForm.value).subscribe(data=>{
      this.msgs = [];
      this.msgs.push({
          severity: 'success', 
          summary: 'Success Message', 
          detail: 'Dayes Updated successfuly!.'
      });
      
    })
    //this.snackBar.open('update Day Registeration is sucessfully');
    this.router.navigate(['listDayReg']);

}

// selectEmp(value){
//  var emp;
//    this.employeeService.getEmpID(value).subscribe(data=>{
//      debugger;
//      emp=data;

//      debugger;
//   var indeMAng=this.Mangers.findIndex(item=>item.id==emp.manegar);
//   this.Manger=this.Mangers[indeMAng].contactName;

//   var indeTL=this.TLs.findIndex(item=>item.id==emp.teamLeader);
//   this.TL=this.TLs[indeTL].contactName;


//   var indecust=this.customers.findIndex(item=>item.id==emp.customerId);
//   this.customer=this.customers[indecust].customerName;

//    });
  

// }

}
