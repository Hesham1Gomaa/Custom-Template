import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(private http:HttpClient) { }

  baseUrl: string = '/api/Payment/';

  //Adding New Role Service

  AddPaymentType(payObj:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'Addpayement',payObj);
  };

  //get all payment roles
  GetAllPayment():Observable<any>{
    debugger;
    return this.http.get<any>(this.baseUrl+'payes');
  };

     //delet role
     DeletPaymnet(payment:any):Observable<any>{
      debugger;
      return this.http.post<any>(this.baseUrl+'DeletePayment',payment);
    };
}
