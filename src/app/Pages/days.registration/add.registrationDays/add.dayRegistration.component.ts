import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import {DaysregistrationService} from 'src/app/Pages/pages.services/days.registration/daysregistration.service';
import {AssignEmpTopoService} from 'src/app/Pages/pages.services/AssignEmpToPO/assign-emp-topo.service';


import {employee} from 'src/app/Pages/pages.services/employee.service/employee'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-add-dayreg',
  templateUrl: './add.dayRegistration.component.html',
  styleUrls: ['./add.dayRegistration.component.css']
})
export class AddDayRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router,private DaysReg:DaysregistrationService,  private AssignedService:AssignEmpTopoService,private employeeService:EmployeeService) { }
  months:any[]=[];
  msgs: Message[]; 

  emps:any[]=[];
  addForm:FormGroup;
  customers:any;
  isEmplyeeSelected:boolean;
  Mangers:any;
  TLs:any;
  editable:boolean=false;
  assignId:any;
  customer:any;
  Manger:any;
  TL:any;
  ngOnInit() {
  
      this.getAllEmployees();
      this.getAllManagers(); 
      this.getAllTeamLeader();
      this.getAllCustomers();

      let empId = localStorage.getItem("editEmpIdregday");
      if(empId){
          this.getEmployeeRegisteredData(empId);
      }
     
      this.addForm = this.formBuilder.group({
        id:[],
        empId:[,Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required],
        empDays: ['', Validators.required],
        approvedDays: ['', Validators.required],
        overTimeDays: ['', Validators.required],
        approvedOverTimeDays: ['', Validators.required]



      });


      this.months=['Jan','Fab','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];          
  } 
  
  getAllManagers(){
    this.employeeService.getAllMangs().subscribe(data=>{
      this.Mangers=data;
    });
  }

  getAllCustomers(){ 
    this.employeeService.getAllcustomers().subscribe(data=>{
      this.customers=data;
      return data;
    });
  }

  getAllTeamLeader(){
    this.employeeService.getAllTL().subscribe(data=>{
      this.TLs=data;
    });
  }

  getAllEmployees(){
    this.employeeService.getAllEmpscust().subscribe(data=>{
      this.emps=data;
    });
  }

  getEmployeeRegisteredData(empId) {
    if(empId) {
      this.editable=true;
      
      this.DaysReg.GetDayRegByEmpId(+empId).subscribe( dataresult => {
          debugger;
          var Obj={
            id:dataresult.id,
            empId:dataresult.empId,
            from:dataresult.from,
            to:dataresult.to,
            empDays:dataresult.empDays,
            approvedDays:dataresult.approvedDays,
            overTimeDays:dataresult.overTimeDays,
            approvedOverTimeDays:dataresult.approvedOverTimeDays
          };

          this.employeeService.getAllEmpscust().subscribe(data => {
              this.emps=data;
              let emp=this.emps.find(item=>item.empId==dataresult.empId);
              this.customer=emp.customerName; 

              this.employeeService.getAllTL().subscribe(data=>{
                this.TLs=data;
                var indeTL=this.TLs.findIndex(item=>item.id==emp.TeamLeader);
                if(indeTL > -1)
                  this.TL=this.TLs[indeTL].contactName;              
              });

              this.employeeService.getAllMangs().subscribe(data=>{
                  this.Mangers=data;
                  var indeMAng=this.Mangers.findIndex(item=>item.id==emp.Manegar);
                  if(indeMAng > -1)
                    this.Manger=this.Mangers[indeMAng].contactName;
              });  
              this.addForm.setValue(Obj);
              this.isEmplyeeSelected = true; 
          });           
          
           

          
      });
    }
      assignEmpId:['',Validators.required]
  }

  ADD_Days() {
    if (this.addForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Fill All Required Data <br/>'
      });
      return;
    }
    this.addForm.value.id=0;
    this.DaysReg.AddDaysReg(this.addForm.value).subscribe(data=>{     
      this.msgs = [];
      this.msgs.push({
          severity: 'success', 
          summary: 'Success Message', 
          detail: 'Dayes Registered successfuly!.'
      });
      this.router.navigate(['listDayReg']);      
    })
  }




  selectEmp(value) {
      var emp;
      this.AssignedService.GetEmpAssignedId(value).subscribe(data=>{
        debugger;
        
      if(data!=null)  {emp=data; 
        this.assignId=data
          var indecust=this.customers.findIndex(item=>item.id==emp.customerId);
          if(indecust > -1){
            this.customer=this.customers[indecust].customerName;
            var indeMAng=this.Mangers.findIndex(item=>item.id==emp.manegar);
            if(indeMAng > -1)
              this.Manger=this.Mangers[indeMAng].contactName;

            var indeTL=this.TLs.findIndex(item=>item.id==emp.teamLeader);
            if(indeTL > -1)
              this.TL=this.TLs[indeTL].contactName;
        }
          this.isEmplyeeSelected = true;
      }
      else{
      this.customer=undefined;
      this.isEmplyeeSelected = false;

      }
    });
  }

}