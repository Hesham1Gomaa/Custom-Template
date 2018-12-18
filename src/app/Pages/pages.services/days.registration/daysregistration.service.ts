import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})



export class DaysregistrationService {

  constructor(private http:HttpClient) { }

  baseUrl: string = '/api/DayRegisteration/' ;

   //Adding Reg Days
   AddDaysReg(dayReg:any):Observable<any>{
     debugger;
    return this.http.post<any>(this.baseUrl+'AddDaysReg',dayReg);
  };

   //Get Reg Days
   GetDaysReg():Observable<any>{
    debugger;
   return this.http.get<any>(this.baseUrl+'DaysReg');
 };

 //Get Reg Day by ID
 GetDayRegByEmpId(id:number):Observable<any>{
  // debugger;
 return this.http.get<any>(this.baseUrl+'DayReg/'+id);
};

//Update DAy Reg

updateDaysReg(DayReg:any):Observable<any>{
debugger;
   
  return this.http.put<any>(this.baseUrl+'UpdateDaysReg/',DayReg);
};





}
