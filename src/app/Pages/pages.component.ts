import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router,ActivatedRoute} from "@angular/router";


@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
  
})
export class PagesComponent implements OnInit  {

  constructor(private spinner: NgxSpinnerService,private router: Router,) {}

  ngOnInit() {
  
      this.router.navigate(['DashBoard']);


  
  }

  

}
