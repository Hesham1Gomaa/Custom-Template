import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignEmpTopoService {

  constructor(private http:HttpClient) { }

    //Get All POs
    GettAllPOs():Observable<any>{
      debugger;
     return this.http.get<any>('/api/POCustomer/GetPos');
   };


   //get All EMp That Assigned tO PO
   GetAssigneeEmpPO(poId:any):Observable<any>{
    debugger;
   return this.http.post<any>('/api/POCustomer/getAssigneeEmpPO',parseInt(poId));
 };

 
    //Get All POs
  GetEmpsAssignedToCust(id:number):Observable<any>{
      debugger;
     return this.http.get<any>('/api/AssignEmployeeToCust/GetAllEmpsAssigned/'+id);
   };

    //Get All Emp By Id
    GetEmpAssignedId(id:number):Observable<any>{
    debugger;
   return this.http.get<any>('/api/AssignEmployeeToCust/GetEmpAssignedId/'+id);
 };


}


