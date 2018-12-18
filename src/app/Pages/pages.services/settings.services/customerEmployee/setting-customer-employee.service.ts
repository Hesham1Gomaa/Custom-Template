import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SettingCustomerEmployeeService {

  constructor(private http:HttpClient) { }

  baseUrl: string = '/api/CustomerEmployee/';



//Add contact  employee
  AddCustomerContact(custEmpObj:any):Observable<any>{

    return this.http.post<any>(this.baseUrl+'addCustEmp',custEmpObj);
  };

}
