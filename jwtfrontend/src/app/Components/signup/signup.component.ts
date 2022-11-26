import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/services';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service/public-api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private signindata={
    email:"",
    password:""
  }
  public email:string=""
  public password:string=""
  public error:string=""
  constructor(private _http:RequestService,private router:Router) { }

  ngOnInit(): void {
  }
  signin(){
    this.signindata={email:this.email,password:this.password}
    let sigin=this._http.Signin(this.signindata).subscribe(
    res=>{if(res.data.token!=-1){console.log(res);this.error="";this.email="";this.password="";

    /*this.router.navigateByUrl('/dash')*/
         }
      },
      err=>{this.error="",this.error=(err.error.error)}
    )
  }
}
