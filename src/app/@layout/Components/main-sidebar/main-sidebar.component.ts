import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {

  userName: any;
  CurrentUser: any;
  DropdownVar = 0;
  pushRightClass = 'push-right';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  browserLang: string;
  locales = [{
                  code: 'en',
                  text: 'English',
                },
                {
                  code: 'ar',
                  text: 'Arabic',
                }]
  constructor(private breakpointObserver: BreakpointObserver, private router: Router
    , private translate: TranslateService) {

    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.browserLang = this.translate.getBrowserLang();
    this.translate.use(this.browserLang.match(/en|ar/) ? this.browserLang : 'en');

    this.CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.CurrentUser == null) {
      this.router.navigate(['login']);

    } else {
      this.userName = this.CurrentUser.userName;

    }
  }
  open(value: any) {
    if (this.DropdownVar !== value) {
      this.DropdownVar = value;
    } else {
      this.DropdownVar = 0;
    }
  }
  changeLang(language: string) {
    debugger
    this.browserLang = language;
    this.translate.use(language);
    const dom: any = document.querySelector('body');
    //if (language == 'ar') {
    //  dom.style.direction='rtl' 
    //}
    //else {
    //  dom.style.direction = 'Ltr'   
    //}
  }
  toggleSidebar() {
    // tslint:disable-next-line:no-debugger
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
  rltAndLtr() {
    // tslint:disable-next-line:no-debugger
    const dom: any = document.querySelector('body');
    const trl = { direction: 'rtl' };
    dom.classList.toggle('trl', true);
  }

}


