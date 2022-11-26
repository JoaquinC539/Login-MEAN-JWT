import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cookies:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token:string=this.cookies.get("auth-token");
    let req=request;
    if(token){
    req=request.clone({
      headers:req.headers.set("auth-token","Bearer"+token)
    });
    }
    return next.handle(request);
  }
}
