import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import{employee} from './employee'
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

 export  class EmployeeService {

  constructor( private http:HttpClient) { }

  emps:employee[];

  
  baseUrl: string = '/api/Employee/';

  //get all employees
  getAllEmps():Observable<employee[]>{
    return this.http.get<employee[]>(this.baseUrl+'Emps');
  };

  //get  employee
  getEmpID(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+'Emp/'+id);
  };
  
  //Adding Employee
  AddEmp(emp:employee):Observable<any>{
    return this.http.post<employee>(this.baseUrl+'AddEmp',emp);
  };

   //Import Emps By excel sheet
   addBulkEmps(importEmps:any[]):Observable<any>{
     debugger;
    return this.http.post<any>(this.baseUrl+'ImportEmps',importEmps);

  }
  //update Employee
  updateEmp(id:number,emp:any):Observable<employee>{
    return this.http.put<any>(this.baseUrl+'UpdateEmp/'+id,emp);
  };

  //customers
  getAllcustomers():Observable<any>{
    return this.http.get<any>('/api/Customer/Custs');
  };

   //Roles
   getAllRoles():Observable<any>{
    return this.http.get<any>('/api/Role/GetRoles');
  };

  //Get Mangers
  getAllMangs():Observable<any>{
    return this.http.get<any>('/api/CustomerEmployee/mangs');
  };

  //Get TLs
  getAllTL():Observable<any>{
    return this.http.get<any>('/api/CustomerEmployee/TL');
  };

  //GET Deps
  getAllDeps():Observable<any>{
    return this.http.get<any>('/api/Department/Deps');
  };

  //GET Payment type
  getAllPayments():Observable<any>{
    return this.http.get<any>('/api/Payment/payes');
  };

  ///Assig Emp TO customer

  AssignEmpToCust(emp:any):Observable<any>{
    debugger;
    return this.http.post<any>('/api/AssignEmployeeToCust/addAssignedEmp',emp);
  };

  //get  employee
  getEmpCustID(id:number):Observable<any>{
    return this.http.get<any>('/api/AssignEmployeeToCust/GetEmpAssignedId/'+id);
  };

  //get all employees customers
  getAllEmpscust():Observable<any>{
    return this.http.get<employee[]>('/api/AssignEmployeeToCust/GetAllCustEmp');
  };

   //update employees customers
   updateAssignedEmp(id:number,emp:any):Observable<employee>{
    return this.http.put<any>('/api/AssignEmployeeToCust/updateAssignedEmp/'+id,emp);
  };

  //Import Emps By excel sheet
  addBulkAssignedEmps(importassignEmps:any[]):Observable<any>{
      debugger;
     return this.http.post<any>('/api/AssignEmployeeToCust/importAssignedEmp',importassignEmps);
 
   }

}
