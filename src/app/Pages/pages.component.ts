import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from "@angular/router";


@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
  
})
export class PagesComponent implements OnInit  {

  constructor(private spinner: NgxSpinnerService,private router:Router) {}

  ngOnInit() {
    //this.spinner.show();
 
    // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 5000);
	 this.router.navigate(['DashBoard']);

  }

  

}
