import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatPaginator, MatSort,MatTableDataSource} from '@angular/material';
import {CustomerSettingService} from 'src/app/Pages/pages.services/settings.services/customer/customer-setting.service';
import { ContactRoleService } from '../../pages.services/settings.services/ContactRole/contact-role.service';
import { Message, ConfirmationService } from 'primeng/components/common/api';


@Component({
  selector: 'app-stting-contact-role',
  templateUrl: './stting-contact-role.component.html',
  styleUrls: ['./stting-contact-role.component.css']
})
export class SttingContactRoleComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private contactroleService:ContactRoleService,private formBuilder: FormBuilder,private router: Router) { }
  allContactsRole:any=[];
  addContactRoleForm:FormGroup;
  submitted:boolean=false;
  displayedColumns: string[] = ['customerRole', 'shortCutRole','actions'];
  dataSource;
  msgs: Message[];
  isAddEditForm:boolean=false;
  editMode:boolean=false;

  ngOnInit() {
    this.addContactRoleForm = this.formBuilder.group({
        Id:[],
        CustomerRole:[,Validators.required],
        ShortCutRole:[,Validators.required]
    });

    this.contactroleService.GetcontactRoles().subscribe(data => {
      debugger;
      if (data.length > 0) {
        data.forEach(item => {
          this.allContactsRole.push({ "CustomerRole": item.customerRole, "ShortCutRole": item.shortCutRole, "Id": item.id })
        })
      }
      //this.allContactsRole.
      //  this.allContactsRole = data;
        // this.dataSource = new MatTableDataSource(this.allContactsRole);
        // this.dataSource.paginator = this.paginator;
    })

  }
  addContactRole() {
      this.editMode = false;
    this.isAddEditForm = true;
    this.addContactRoleForm.reset();
  }

  editContactRole(contactObj) {
      debugger;
      this.addContactRoleForm.setValue(contactObj);
      this.editMode = true;
      this.isAddEditForm = true;
  }

  Cancel() {
    this.isAddEditForm = false;
    this.editMode = false;
      this.addContactRoleForm.setValue({});
  }

  get f() { 
      return this.addContactRoleForm.controls; 
  }
 
  AddNewContactRole() {
      debugger;
      this.submitted = true;      
      // stop here if form is invalid
      if (this.addContactRoleForm.invalid) {
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Please Fill All Required Data <br/>'
        });
        return;
      }
      if(this.addContactRoleForm.value.Id == null) {
        this.addContactRoleForm.value.Id = -1;
        this.contactroleService.AddContactRole(this.addContactRoleForm.value).subscribe(data => {
            this.msgs = [];
            this.msgs.push({
              severity: 'success',
              summary: 'Success Message',
              detail: 'Sucessful Adding New Contact Role'
            });

            this.allContactsRole.push(this.addContactRoleForm.value);
            this.editMode = false;
            this.isAddEditForm = false;
            // this.contactroleService.GetcontactRoles().subscribe(data=>{
            //    this.dataSource = new MatTableDataSource(data);
            //    this.dataSource.paginator = this.paginator;
            // })      
        });
      }   
      else{
        this.contactroleService.EditContactRole(this.addContactRoleForm.value).subscribe(data => {

          let index = this.allContactsRole.findIndex((item) => {
            return item.Id == this.addContactRoleForm.value.Id
        });
          if (index > -1) {
            this.allContactsRole[index] = this.addContactRoleForm.value;
            this.editMode = false;
            this.isAddEditForm = false;
          }
              this.msgs = [];
              this.msgs.push({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Sucessful Updating Contact Role'
              });
              
              // this.contactroleService.GetcontactRoles().subscribe(data=>{
              //    this.dataSource = new MatTableDataSource(data);
              //    this.dataSource.paginator = this.paginator;
              // })      
          });
      }
  }

    Delete(controle) {
        this.contactroleService.DeletContactRole(controle).subscribe(data=>{
          
          let index = this.allContactsRole.findIndex((item) => {
            return item.Id == controle.Id
          });
            if(index > -1)
              this.allContactsRole.splice(index,1);
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Sucessful Contcat Role Deleted'
          });
          // this.contactroleService.GetcontactRoles().subscribe(data=>{
          //    this.dataSource = new MatTableDataSource(data);
          //    this.dataSource.paginator = this.paginator;
          // })
        })
    }

    // applyFilter(filterValue: string) {
    //   filterValue = filterValue.trim(); // Remove whitespace
    //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //   this.dataSource.filter = filterValue;
    // };
}
