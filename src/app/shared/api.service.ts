import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient){}
  postEmploye(data:any){
    return this.http.post<any>("http://localhost:3000/employee", data)
    .pipe(map((result:any)=>{
      return result;
    }
    ))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employee")
    .pipe(map((result:any)=>{
      return result;
    }
    ))
  }
  updateEmployee(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/employee/"+id,data)
    .pipe(map((result:any)=>{
      return result;
    }
    ))
  }
  deleteEmployee(id:number){
    debugger;
    return this.http.delete<any>("http://localhost:3000/employee/"+id)
    .pipe(map((result:any)=>{
      return result;
    }
    ))
  }
}
