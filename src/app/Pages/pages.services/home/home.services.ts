import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export  class DashboardServices {

    poBaseUrl: string = '/api/POCustomer/';
    itemBaseUrl: string = '/api/PoItemDesc/';
    invoiceBaseUrl: string = '/api/Invoices/';

    constructor( private http:HttpClient) { }

    getAllPosPerMonth():Observable<any>{
        return this.http.get<any>(this.poBaseUrl+'GetPosPerMonth');
    };
    getInvoiceByMonth():Observable<any>{
        return this.http.get<any>(this.invoiceBaseUrl+'getInvoiceByMonth');
    };
    getPosPerCustomer():Observable<any>{
        return this.http.get<any>(this.poBaseUrl+'GetPosPerCustomer');
    };
    getItemEmployees():Observable<any>{
        return this.http.get<any>(this.itemBaseUrl+'GetItemEmployees');
    };



}