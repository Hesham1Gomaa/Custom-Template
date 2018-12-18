import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePOService {

  constructor(private http:HttpClient) { }

    
  baseUrl: string = '/api/POCustomer/';

  //Adding  PO Customer
  AddPOCustomer(PoObject:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'AddPo',PoObject);
  };

    //Update  PO Customer
  UpdatePOCustomer(PoObject:any):Observable<any>{
      debugger;
      return this.http.put<any>(this.baseUrl+'UpdatePO',PoObject);
    };

   ///Assign EMpTOPO
   AssignEmpToPO(PoEMP:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'AssignEmPO',PoEMP);
  };

   //get  PO by id
   GetPoId(id:number):Observable<any>{
    return this.http.get<any>('/api/POCustomer/GetPoId//'+id);
  };

   ///AD PO item Description
   AddPoItemDesc(Podesc:any):Observable<any>{
    debugger;
    return this.http.post<any>('api/PoItemDesc/AddPoItemDesc',Podesc);
  };

 ///Get All Emp That not adding to this po
   GetAllEmpsNotPO(poId:any):Observable<any>{
    debugger;
    return this.http.post<any>('api/POCustomer/GetEmps',parseInt(poId));
  };
  

  ///Get All PO item Description
  GetAllPoDEsc():Observable<any>{
    debugger;
    return this.http.get<any>('api/PoItemDesc/AlPOitemdesc');
  };

  ///Get All PO item Description
  GetAllPoStatus():Observable<any>{
    debugger;
    return this.http.get<any>('api/POCustomer/getPOStatus');
  };
  
  //get poidescription depend on poid
  GetPOitemswithPoId(poId:any):Observable<any>{
    debugger;
    return this.http.post<any>('api/POCustomer/getPoitems',parseInt(poId));
  }
  
}
