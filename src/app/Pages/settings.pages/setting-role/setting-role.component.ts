import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {RoleSettingsService} from 'src/app/Pages/pages.services/settings.services/role/role-settings.service';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-setting-role',
  templateUrl: './setting-role.component.html',
  styleUrls: ['./setting-role.component.css']
})
export class SettingRoleComponent implements OnInit {

  constructor(private RoleService: RoleSettingsService, private formBuilder: FormBuilder, private router: Router) {
    this.RoleService.GetRoles().subscribe(data => {
      this.listRole = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })

  }

  addRoleForm:FormGroup;
  submitted: boolean = false;
  checkAdd: boolean = false;
  checkEdit: boolean = false;
  editObj: any;
  title='Add Role'
  displayedColumns: string[] = ['roleName', 'actions'];
  dataSource;
  listRole = [];
  msgs: Message[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.addRoleForm = this.formBuilder.group({
      id:0,
      roleName:[,Validators.required]
    });

  

  }


  Edit(obj) {
 //   debugger;
    this.title = "Edit Role"
    this.checkEdit = true;
    this.addRoleForm.controls['roleName'].setValue(obj.roleName);
    this.addRoleForm.controls['id'].setValue(obj.id);
    this.editObj=obj
 
  }
  Cancel() {
  //  debugger
    if (this.title == "Add Role")
      this.addRoleForm.controls['roleName'].setValue('');
    else
      this.addRoleForm.patchValue(this.editObj)

    this.checkAdd = false;
    this.checkEdit = false;

  }
  addPanel()
  {
    //debugger;
    this.addRoleForm.controls['roleName'].setValue('');
    this.checkAdd = !this.checkAdd;
    this.submitted = false;
  }
  AddRole() {
   // debugger;
      this.submitted = true;
  
   
       // stop here if form is invalid
    if (this.addRoleForm.invalid) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Please Enter Role Name <br/>'
      });
         return;
    }

      
    this.RoleService.AddRole(this.addRoleForm.value).subscribe(data => {
      if (data.message == "Adding Role Sucessful") {
        this.dataSource.data.push(data.obj);
        this.dataSource.paginator = this.paginator;

        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: data.message
        });
     
      }
      else if (data.message == "Edit Role Sucessful") {
        let index = this.dataSource.data.findIndex((item) => {
          return item.id == this.editObj.id
        });
        this.dataSource.data[index] = this.addRoleForm.value;
        this.dataSource.paginator = this.paginator;
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: data.message
        });
      
      }
      else {
        this.msgs.push({
          severity: 'error',
          summary: data.message
        });
       
      }
      this.addRoleForm.controls['roleName'].setValue('');
        
       })
    this.checkAdd = false;
    this.checkEdit=false
   };


   Delete(role){
  //  debugger;
     let index = this.dataSource.data.findIndex((item) => {
       return item.id == role.id
     });
     this.RoleService.DeletRole(role).subscribe(data => {
     //  debugger;
       if (data.message == "Delete Object Successful") {
         this.dataSource.data.splice(index, 1);
         this.dataSource.paginator = this.paginator;
         this.msgs = [];
         this.msgs.push({
           severity: 'success',
           summary: data.message
         });
       }
       else {

         this.msgs = [];
         this.msgs.push({
           severity: 'error',
           summary: data.message
         });
       }
    })
  };
 

       applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
  };
  get f() {
    return this.addRoleForm.controls;
  }

 
}
