import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service';
import {CreatePOService} from 'src/app/Pages/pages.services/create.PO/create-po.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message, ConfirmationService } from 'primeng/components/common/api';



@Component({
  selector: 'app-create-pocustomer',
  templateUrl: './create-pocustomer.component.html',
  styleUrls: ['create-pocustomer.component.css']
})
export class CreatePOCustomerComponent implements OnInit {

  addPOForm: FormGroup;
  customers:any;
  DPs:any;
  PoItems:any=[];
  PoTerms:any=[];
  PoStatus:any=[];

  PoContacts:any=[];
  POcontact:any={};

  Popaymentterms:any=[];
  POpaymentterm:any={}

  msgs: Message[];

  POItem:any={};
  POItemWithName:any={};
  roles:any=[];
  checkEmptyRow:boolean=true;

  newPoi:any={};
  newcontact:any={};
  newpayment:any={}

  statusFlag:boolean=false;

  PIOItemArr:any=[];
  PIOItemsdesc:any=[];
  editable:boolean=false;

  DpId:any;
  Qty:any;
  UnitPrice:any;
  TotalAmount:any;
  PoId:any;



  constructor(private formBuilder: FormBuilder,private router: Router, private spinner: NgxSpinnerService, private employeeService:EmployeeService,private CreatePOService:CreatePOService) { 
    
  }

  ngOnInit() {

      this.addPOForm = this.formBuilder.group({
        Id:[],
        CustomerId:[,Validators.required],
        PonoCreation:[,Validators.required],
        Podescription:[,Validators.required],
        StatusId:[,Validators.required],
        Potype:[],
        PocustomerNo:[],
        PocreationDate:[],
        PoapprovalDate:[],
        Prno:[],
        PrapprovalDate:[],
        Buyer:[],
        Requester:[],
        RequesterDept:[],
        Penalty:[],
        SupplierName:[],
        SupplierAdderss:[],
        Currency:[],
        PaymentTerm:[],
        DeliveryTerm:[],
        DeliveryTime:[],
        DeliveryLocation:[],
        Poitem:[[]],
        Pocontacts:[[]],
        PopaymentTerms:[[]],
        Active:[],
        UploadPo: [""]
      });


      this.spinner.show();     
      this.PoId = localStorage.getItem("POId"); 
      if( this.PoId !=undefined){
        this.editable=true;
      }  

      this.CreatePOService.GetAllPoDEsc().subscribe(data=>{ 
        debugger;
        this.PIOItemsdesc=data;
        if(!this.PoId)
          this.spinner.hide();
      });
      if(this.PoId) {
          this.CreatePOService.GetPoId(+this.PoId).subscribe( data => {
              var obj = JSON.parse(data.toString());
              this.addPOForm.setValue(obj);
              obj.Poitem.forEach(element => {
                  this.PoItems.push(element);  
                  this.POItemWithName={};
                  var index=this.PIOItemsdesc.findIndex(item=>item.id==element.Podescid);
                  if(index > -1){
                      var Descname=this.PIOItemsdesc[index].descriptions;
                      this.POItemWithName.DescPoitemName=Descname;
                      this.POItemWithName.Qty=element.Qty;
                      this.POItemWithName.UnitPrice=element.UnitPrice;
                      this.POItemWithName.TotalAmount=element.TotalAmount;
                      this.PIOItemArr.push(this.POItemWithName); 
                      this.POItemWithName={};
                  }
              });
              obj.Pocontacts.forEach(element => {
                this.PoContacts.push(element);          
              });
              obj.PopaymentTerms.forEach(element => {
                this.Popaymentterms.push(element);          
              });
            this.spinner.hide();
          });
      }


      this.employeeService.getAllcustomers().subscribe(data => {
        this.customers=data;
      });

      this.employeeService.getAllRoles().subscribe(data => {
        this.roles=data;
      });

      this.CreatePOService.GetAllPoStatus().subscribe(data => {
        this.PoStatus=data;
      });

      this.employeeService.getAllDeps().subscribe(data => {
        this.DPs=data;
      });

  }

  AddingPOitem(argument){

    var index=this.PIOItemsdesc.findIndex(item=>item.id==this.newPoi.Podescid);
    if(index > -1){
        this.POItem={};
        this.POItemWithName={};

        var Descname=this.PIOItemsdesc[index].descriptions;

        this.POItem.Podescid=this.newPoi.Podescid;
        this.POItemWithName.Podescid=this.newPoi.Podescid;
        this.POItemWithName.DescPoitemName=Descname;

        this.POItem.Qty=this.newPoi.Qty;
        this.POItemWithName.Qty=this.newPoi.Qty;

        this.POItem.UnitPrice=this.newPoi.UnitPrice;
        this.POItemWithName.UnitPrice=this.newPoi.UnitPrice;

        this.POItem.TotalAmount=this.newPoi.Qty * this.newPoi.UnitPrice;
        this.POItemWithName.TotalAmount=this.newPoi.Qty * this.newPoi.UnitPrice;

        this.PIOItemArr.push(this.POItemWithName);
        this.PoItems.push(this.POItem);
        
        this.newPoi={};
    }
  }

  AddPOContact(argument){
    this.POcontact={};
    this.POcontact.Name=this.newcontact.Name;
    this.POcontact.Email=this.newcontact.Email;
    this.POcontact.Mobile=this.newcontact.Mobile;
    this.PoContacts.push(this.POcontact);
    this.newcontact={};
  }

  selectIssued(value){
    if(value=="1"){
      this.statusFlag=true;

    }
    else{
      this.statusFlag=false;
    }
  }

  AddPoPaymentTerm(argument){
    this.POpaymentterm={};
    this.POpaymentterm.SerailNumber=this.newpayment.SerailNumber;
    this.POpaymentterm.Name=this.newpayment.Name;
    this.POpaymentterm.Percentage=this.newpayment.Percentage;
    this.Popaymentterms.push(this.POpaymentterm);
    this.newpayment={};
  }

  DeletePOitem(index){
    this.PoItems.splice(index, 1);
    this.PIOItemArr.splice(index, 1);
  }
  
  DeletePOcontact(index){
    this.PoContacts.splice(index, 1);
  }

  DeletePOpaymentterm(index){
    this.Popaymentterms.splice(index, 1);
  }

  ADDCusPO() {
    debugger;
    this.addPOForm.value.Poitem=[];
    this.addPOForm.value.Poitem=this.PoItems;

    this.addPOForm.value.Pocontacts=[];
    this.addPOForm.value.Pocontacts=this.PoContacts;

    this.addPOForm.value.PopaymentTerms=[];
    this.addPOForm.value.PopaymentTerms=this.Popaymentterms;
    this.addPOForm.value.UploadPo=" ";
    this.addPOForm.value.Id=-1;
    this.addPOForm.value.Active=true

    if (this.addPOForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Fill All Required Data <br/>'

      });
      return;
    }

    if(this.editable==true){
      this.CreatePOService.UpdatePOCustomer(this.addPOForm.value).subscribe(data=>{
        this.msgs = [];
        if(data.isSuccess==true){
          this.msgs.push({
            severity: 'success', 
            summary: 'Success Message', 
            detail: 'PO Update Sucessful!.'
        });
        }
        else{
          this.msgs.push({
            severity: 'danger', 
            summary: 'Error Message', 
            detail: 'PO Update Failed!.'
        });
        }
      })
    }
    else{
      this.CreatePOService.AddPOCustomer(this.addPOForm.value).subscribe(data=>{
        console.log(data);
        this.msgs = [];
        this.msgs.push({
          severity: 'success', 
          summary: 'Success Message', 
          detail: 'PO Add Sucessful!.'
      });
      })
    }
}

}
