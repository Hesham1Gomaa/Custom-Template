import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";
import {AuthenticationService} from 'src/app/Pages/pages.services/_authentication.service/authentication.service'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  logInForm:FormGroup;
  submitted:boolean=false;
  returnUrl: string;
  LOGO: string = "./src/assets/images/download.jpg";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthenticationService,
    private route: ActivatedRoute,) { }

  ngOnInit() {

    this.logInForm=this.formBuilder.group({
      UserName:['',Validators.required],
      Password: ['', Validators.required],

    });
    // reset login status
    this.authService.logout();
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
 // convenience getter for easy access to form fields
 get f() { 
   return this.logInForm.controls; }

  LOgIn(){
debugger;
   this.submitted = true;
   
        // // stop here if form is invalid
        if (this.logInForm.invalid) {
             return;
         }
var obj={
  id: 0,
  password: this.logInForm.value.Password,
  userName: this.logInForm.value.UserName
  

};
localStorage.setItem('currentUser', JSON.stringify(obj));
          this.router.navigate(['DashBoard']);
        


        // this.authService.login(this.logInForm.value).subscribe(data=>{
        //   debugger;
        //   if(data.isSuccess !=true){ 
        //     alert(data.message);
        //   }
        //   else{
        //   localStorage.setItem('currentUser', JSON.stringify(data.obj));
        //   this.router.navigate(['DashBoard']);
        //   //this.router.navigate([this.returnUrl]);
        //   }

        // });


  };

}
