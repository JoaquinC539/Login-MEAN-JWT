import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/services';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'create',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public regModel={
    name:"",
    email:"",
    password:""
  }
  public response:any;
  public email:string="";
  public password:string="";
  public name:string=""
  public error:any
  public success:any
  constructor(private _http:RequestService,private cookieservice:CookieService) {

     }

  ngOnInit(): void {
  }
  workapi(){
    let request=this._http.getWorking().subscribe(
      res=>{let response=res.estado;if(response==true){alert("Api funcionando")}}
    )
  }
  login(){
    this.regModel={name:this.name,email:this.email,password:this.password}
    let register=this._http.Register(this.regModel).subscribe(
      res=>{this.success=res.status,console.log(res); this.name="";this.email="";this.password=""},
      err=>{this.error=err.error.error;this.password=""}
    );

  }
}
