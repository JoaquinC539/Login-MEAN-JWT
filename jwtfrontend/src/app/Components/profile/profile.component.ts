import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http:RequestService, private router:Router) { }

  ngOnInit(): void {
    let cookietoken=this.http.getToken()
    const headers={"auth-token":cookietoken}
    this.http.getDash(headers).subscribe(
      res=>{console.log(res)}
    )
  }
  logout(){
    console.log("logout pushed")
    this.http.deleteCookie();
    console.log("after cookie deletion")
    this.router.navigateByUrl("/")
  }

}
