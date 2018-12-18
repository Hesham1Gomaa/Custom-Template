import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AssignEmpTopoService} from 'src/app/Pages/pages.services/AssignEmpToPO/assign-emp-topo.service'
import {EmployeeService} from 'src/app/Pages/pages.services/employee.service/employee.service'
import {CreatePOService} from 'src/app/Pages/pages.services/create.PO/create-po.service';
import {InvoicesService} from 'src/app/Pages/pages.services/invoices/invoices.service';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

addInvoiceForm:FormGroup;
selctionPO:boolean=false;
AllPOs:any[]=[];
customer:any;
allcustomers:any;
allEmps:any[];
poitemsDesc:any[]=[];
AssignedEmpToPO:any[]=[];
calcArr:any[]=[];
poItemInvoiced:any[]=[];
calculationFlag:boolean=false;
RegisterationDaysInvoicedArr:any[]=[];



constructor(private CreatePOService:CreatePOService,private invoiceService:InvoicesService,private AssigPOEmp:AssignEmpTopoService,private empService:EmployeeService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {

    this.addInvoiceForm = this.formBuilder.group({
      poid:[,Validators.required],
      invoiceNo:[,Validators.required],
      invoiceDate:[,Validators.required],
      amount:[,Validators.required],

    });

  this.empService.getAllcustomers().subscribe(data=>{
      this.allcustomers=data;
     });
 
  this.AssigPOEmp.GettAllPOs().subscribe(data=>{
      debugger;
      this.AllPOs=data;
    });
  };


  selectPO(value){
    debugger;
    var emp;
     var indePO=this.AllPOs.findIndex(item=>item.id==value);
     var PO=this.AllPOs.find(item=>item.id==value);

     var customIdIndex=this.allcustomers.findIndex(item=>item.id==PO.customerId);


     this.customer=this.allcustomers[customIdIndex].customerName;


     this.empService.getAllEmps().subscribe(data=>{
       this.allEmps=data;
    });

    // this.CreatePOService.GetPOitemswithPoId(value).subscribe(data=>{
    //   debugger;
    //   //this.poitemsDesc=data;
    // });

    this.invoiceService.GetPOitemsInvoicedOrNotwithPoId(value).subscribe(data=>{
      debugger;
      this.poitemsDesc=data;
    });

    this.AssigPOEmp.GetAssigneeEmpPO(value).subscribe(data=>{
      debugger;
      // this.AssignedEmpToPO=[];

      // data.reduce((res, value) =>{
      //   if (!res[value.id]) {

      //      res[value.id] = {
      //       approvedDays: 0,
      //       id: value.id,
      //       unitPrice:value.unitPrice,
      //       descriptions:value.descriptions,
      //       empName:value.empName,

      //     };

      //   this.AssignedEmpToPO.push(res[value.id])
      //   }
      //     res[value.id].approvedDays += value.approvedDays
      //    return res;
      //    }, {});

      this.AssignedEmpToPO=data;
         debugger;
    });

    //calculations
    
     this.selctionPO=true;
     
  };

  calculatePO(){
    debugger;
    this.poitemsDesc.forEach((value, index) => {
      this.AssignedEmpToPO.forEach((value2, index) =>{
        debugger;
        var allowedQT=value.totalAmount-value.invoicedQT;
        if(value.poitemId===value2.id){
          if(value2.approvedDayes.remaingingDayes <= allowedQT ){
            var obj={
              desc:value.descriptions,
              actualAmount:(value2.unitPrice)*(value2.approvedDayes.remaingingDayes),
              RemindAmount:(((value2.unitPrice)*(value2.approvedDayes.remaingingDayes))-value.totalAmount)*(-1),
              Amount:value.totalAmount};

              this.calcArr.push(obj);
            var poitemInvoiceObject={poiItemId:value.poitemId,TotalPoitemQt:value.qty,consumedPoItemQt:value.invoicedQT+value2.approvedDayes.remaingingDayes};
            var regInvoicedDayes={id:value2.id,TotalRegistrationDays:value2.approvedDayes.totalRegistrationDays,
                                  invoicedDayes:value2.invoicedDayes+value2.approvedDayes.remaingingDayes,
                                  remaingingDayes:(value2.approvedDayes.totalRegistrationDays-(value2.invoicedDayes+value2.approvedDayes.remaingingDayes)),
                                  assignEmpId:value2.approvedDayes.assignEmpId
                                };
            this.RegisterationDaysInvoicedArr.push(regInvoicedDayes);
                            
             this.poItemInvoiced.push(poitemInvoiceObject);


          }
          else{
            var obj={
              desc:value.descriptions,
              actualAmount:(value2.unitPrice)*(allowedQT),
              RemindAmount:(((value2.unitPrice)*(allowedQT))-value.totalAmount)*(-1),
              Amount:value.totalAmount};

              var poitemInvoiceObject={poiItemId:value.poitemId,TotalPoitemQt:value.qty,consumedPoItemQt:value.invoicedQT+allowedQT};
              this.poItemInvoiced.push(poitemInvoiceObject);

              var regInvoicedDayes={id:value2.id,TotalRegistrationDays:value2.approvedDayes.totalRegistrationDays,
                invoicedDayes:value2.invoicedDayes+allowedQT,
                remaingingDayes:(value2.approvedDayes.totalRegistrationDays-(value2.invoicedDayes+allowedQT)),
                assignEmpId:value2.approvedDayes.assignEmpId,
              };
             this.RegisterationDaysInvoicedArr.push(regInvoicedDayes); 

              this.calcArr.push(obj);

          }
         

        }
      });
    });
    this.calculationFlag=true;
    debugger;
  };

  addInvoice(){
    debugger;
    this.calcArr.forEach((value,index)=>{
      
      this.addInvoiceForm.value.amount+=value.actualAmount;
    });
    var invoiceObjects={invoiceObject:this.addInvoiceForm.value,registerationDaysInvoicedArr:this.RegisterationDaysInvoicedArr,poitemInvoicedArr:this.poItemInvoiced};
    this.invoiceService.AddInvoice(invoiceObjects).subscribe(data=>{
      debugger;
      if(data.isSuccess==true){
        alert(data.message);
      }
      else{
        alert(data.message);
      }
    })
    debugger;

  }

}
