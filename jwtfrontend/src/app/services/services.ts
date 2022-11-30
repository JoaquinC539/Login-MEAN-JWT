import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
public url:string

  constructor(private _http:HttpClient,private cookies:CookieService) {
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
   setToken(token:string){
    this.cookies.set("auth-token",token);
   }
   getToken(){
    return this.cookies.get("auth-token");
   }
   deleteCookie(){
    return this.cookies.delete('auth-token');
   }
   checkCookie(){
    return this.cookies.check("auth-token");
   }
   getDash(headers:any):Observable<any>{
    return this._http.get(this.url+"/dash",{headers});
   }
   testPost(headers:any):Observable<any>{
    return this._http.post(this.url+"/testpost",null,{headers});
   }
   gettickets(headers:any):Observable<any>{
    return this._http.get(this.url+"/tickets",{headers})
   }
   newTicket(headers:any,ticketbody:any):Observable<any>{
    return this._http.post(this.url+"/pticket",ticketbody,{headers})
   }
   changeStatus(headers:any,statuschange:any){
    return this._http.put(this.url+"/updateticket",statuschange,{headers})
   }
   deleteTicket(headers:any,id:any){
    return this._http.post(this.url+"/deleteticket",id,{headers})
   }

}
