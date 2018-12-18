import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs'
import{ContactRole} from './ContactRole'

@Injectable({
  providedIn: 'root'
})
export class ContactRoleService {

  constructor(private http:HttpClient) { }

  
  baseUrl: string = '/api/ContactRole/';

 
  AddContactRole(contactRObject:any):Observable<any>{

    return this.http.post<any>(this.baseUrl+'add',contactRObject);
  };
  EditContactRole(contactRObject:any):Observable<any>{

   return this.http.post<any>(this.baseUrl+'edit',contactRObject);
 };

  //get all Contact Roles
  GetAllContactRoles():Observable<ContactRole[]>{

    return this.http.get<any>(this.baseUrl+'get');
  };

    //get all Contact roles
    GetcontactRoles():Observable<any>{
      debugger;
      return this.http.get<any>(this.baseUrl+'get');
    };

     //delete  Contactrole
   DeletContactRole(controle:any):Observable<any>{
    debugger;
    return this.http.post<any>(this.baseUrl+'DeleteContactRole',controle);
  };
 

}
