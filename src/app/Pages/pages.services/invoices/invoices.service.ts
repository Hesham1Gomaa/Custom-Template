import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http:HttpClient) { }

  
    
  baseUrl: string = 'api/Invoices/';

  //Adding  
  AddInvoice(invoiceObject:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'addInvoice',invoiceObject);
  };
  
  //Adding  
  GetAllInvoice():Observable<any>{
    debugger;
    return this.http.get<any>(this.baseUrl+'getInvoices');
  };
  
  ///get PO item invoiced and not invoicde
  GetPOitemsInvoicedOrNotwithPoId(poId:any):Observable<any>{
    debugger;
    return this.http.post<any>('api/PoitemInvoice/getPoitems/',parseInt(poId));
  }

  //Update Invoice STatus
  updtaeInvoiceStatus(inviceObject:any):Observable<any>{
    return this.http.post<any>('api/Invoices/UpdatInvoiceStatus',inviceObject);
  }

}
