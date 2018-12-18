import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomerSettingService {

  constructor(private http:HttpClient) { }

  baseUrl: string = '/api/Customer/';


  //add new customer
  GetAllCustomers():Observable<any>{

    return this.http.get<any>(this.baseUrl+'Custs');
  };

  //Add new Customer
  AddCustomer(custObj: any): Observable<any>{
    custObj.id = custObj.id == null ? custObj.id = 0 : custObj.id;
    return this.http.post<any>(this.baseUrl+'AddCust',custObj);
  };

  //Delete Customr
  DeleteCustomer(custObj:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'DeleteCust',custObj);
  };
}
