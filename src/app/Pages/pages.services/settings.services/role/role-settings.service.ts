import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class RoleSettingsService {

  constructor(private http:HttpClient) { }

  baseUrl: string = '/api/Role/';

  //Adding New Role Service

  AddRole(roleObj:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'AddRole',roleObj);
  };

  //get all roles
  GetRoles():Observable<any>{
    debugger;
    return this.http.get<any>(this.baseUrl+'GetRoles');
  };

   //delet role
   DeletRole(role:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'DeleteRole',role);
  };
}
