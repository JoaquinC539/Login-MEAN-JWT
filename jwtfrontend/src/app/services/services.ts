import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
public url:string

  constructor(public _http:HttpClient) {
    this.url="http://localhost:3000/api";

   }
   getWorking():Observable<any>{
    return this._http.get(this.url+"/work");
   }
   Register(regData:any):Observable<any>{
    return this._http.post(this.url+"/register",regData)
   }
   Signin(signData:any):Observable<any>{
    return this._http.post(this.url+"/login",signData)
   }
}
