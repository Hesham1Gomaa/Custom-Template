import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CreatePOService} from 'src/app/Pages/pages.services/create.PO/create-po.service';
import { Message, ConfirmationService } from 'primeng/components/common/api';



@Component({
  selector: 'app-poitemdescroption',
  templateUrl: './poitemdescroption.component.html',
  styleUrls: ['./poitemdescroption.component.css']
})
export class PoitemdescroptionComponent implements OnInit {


  addPOitemForm:FormGroup;
  PoitemDescLists: any[] = [];
  msgs: Message[]
  constructor(private CreatePOService:CreatePOService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {

    this.addPOitemForm = this.formBuilder.group({
      Descriptions:[,Validators.required]
    });

    this.CreatePOService.GetAllPoDEsc().subscribe(data=>{
           this.PoitemDescLists=data;
    });
  }


  AddPItemDesc(){
    debugger;
    if (this.addPOitemForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Fill All Required Data <br/>'
      });
      return;
    }
  this.CreatePOService.AddPoItemDesc(this.addPOitemForm.value).subscribe(data=>{

    debugger;
    alert('Sucessful Adding PO item Description');
  })
  }

}
