import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AssignEmpTopoService} from 'src/app/Pages/pages.services/AssignEmpToPO/assign-emp-topo.service'
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service'
import {CreatePOService} from 'src/app/Pages/pages.services/create.PO/create-po.service';
import { Message, ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-assign-emp-to-po',
  templateUrl: './assign-emp-to-po.component.html',
  styleUrls: ['./assign-emp-to-po.component.css']
})
export class AssignEmpToPOComponent implements OnInit {

  addPOForm:FormGroup;
AllPOs:any[]=[];
customer:any;
CreationDt:any;
poapprovalDt:any;
empId:any;
poitemId:any;
Podescid:any;
deliveryDT:any;
selctionPO:boolean=false;
allcustomers:any;
allEmps:any[]=[];
assignedEmpPO:any[]=[];
assignedEmpPOIds:any[]=[];
selctionEmp:boolean=false;
poitemsDesc:any[]=[];
selctionPOdesc:boolean=false;
  msgs:Message[]
POITemDEsc:any;


  constructor(private CreatePOService:CreatePOService,private AssigPOEmp:AssignEmpTopoService,private empService:EmployeeService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {

  this.addPOForm = this.formBuilder.group({
      poid:[null,Validators.required],
      employeesPoObjectlist:[[],Validators.required],

     // empIds:[[],Validators.required],
     // Podescid:[,Validators.required],
      //poitemId:[,Validators.required]

    });

  this.empService.getAllcustomers().subscribe(data=>{
     this.allcustomers=data;
    });

  this.AssigPOEmp.GettAllPOs().subscribe(data=>{
     debugger;
     this.AllPOs=data;
   });

  }


  selectPO(value){
    debugger;
    var emp;
     var indePO=this.AllPOs.findIndex(item=>item.id==value);
     var PO=this.AllPOs.find(item=>item.id==value);

     var customIdIndex=this.allcustomers.findIndex(item=>item.id==PO.customerId);


     this.customer=this.allcustomers[customIdIndex].customerName;
     this.CreationDt=this.AllPOs[indePO].pocreationDate;
     this.poapprovalDt=this.AllPOs[indePO].poapprovalDate;
     this.deliveryDT=this.AllPOs[indePO].deliveryTime;

    //  this.empService.getAllEmps().subscribe(data=>{
    //    this.allEmps=data;
    // });

    this.CreatePOService.GetAllEmpsNotPO(value).subscribe(data=>{
      debugger;
       this.allEmps=[];
      data.forEach((value,index)=>{
      this.allEmps.push(value.emps);
      });
      debugger;
    })

    this.CreatePOService.GetPOitemswithPoId(value).subscribe(data=>{
      debugger;
      this.poitemsDesc=data;
    });

     this.selctionPO=true;
     
  };

  addEmpToPo(value){
    debugger;
  
    //this.addPOForm.value.empIds.push(value);
    this.empId=value;


  };
  // selctPOitemDesc(value){
  //   debugger;
  //   this.addPOForm.value.Podescid=value;
  // }

  DeleteEmpPO(index){
    debugger;
    this.assignedEmpPO.splice(index, 1); 
    this.addPOForm.value.empIds.splice(index, 1);
  };

  AssinEmp_PO() {
    debugger;

    this.CreatePOService.AssignEmpToPO(this.addPOForm.value).subscribe(data=>{
      console.log(data);
      alert('employess Adding Sucessful to PO');
    })

};


selectPOitemDesc(value){
  debugger;
  var indePOdesc=this.poitemsDesc.findIndex(item=>item.id==value);
  // this.addPOForm.value.poitemId=this.poitemsDesc[value].poitemId;
  this.poitemId=this.poitemsDesc[indePOdesc].poitemId;
  this.POITemDEsc=this.poitemsDesc[indePOdesc].qty;
  this.Podescid=this.poitemsDesc[indePOdesc].id;

  this.selctionPOdesc=true;
};
ADDEmpPO(){
  debugger;
  // if (this.addPOForm.invalid) {
  //   this.msgs = [];
  //   this.msgs.push({
  //     severity: 'error',
  //     summary: 'Error Message',
  //     detail: 'Please Fill All Required Data <br/>'
  //   });
  //   return;
  // }
  this.selctionEmp=true;

  var Emp=this.allEmps.find(item=>item.id==this.empId);
  this.assignedEmpPO.push(Emp);
   
  var poitemObject={poitemId:this.poitemId,podescid:this.Podescid,empId:this.empId};
this.addPOForm.value.employeesPoObjectlist.push(poitemObject);
debugger;
}

}
