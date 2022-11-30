import { Component, ElementRef, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/services';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userInfo:any;
  public name:string="";
  private id:string=""
  private cookietoken:any
  private headers:any
  private navigate:any
  public serviceTickets:any[]=[]
  public work:string=""
  public status:boolean=false
  public comments:string=""
  public ticket: Ticket
  public ticketDone:boolean=false
  constructor(private http:RequestService, private router:Router) {
    this.cookietoken=this.http.getToken();
    this.headers={"auth-token":this.cookietoken}
    this.ticket={work:this.work,status:this.status,comments:this.comments}
   }
  ngOnInit(): void {
    console.clear()
      this.http.getDash(this.headers).subscribe(
        res=>{
          this.userInfo=res;
          this.name=this.userInfo.data.user.name;
          this.id=this.userInfo.data.user.id;
        },
        err=>{console.log(err.error),this.logout()}
      )
      this.getServiceTickets()
  }
  logout(){
    this.http.deleteCookie();
    this.router.navigateByUrl("/signup")
  }
  getServiceTickets(){
    this.http.gettickets(this.headers).subscribe(
      res=>{
        this.serviceTickets=res.results;
      },
      err=>{this.logout()}
    )
  }
  newTicket(){
    this.ticket={work:this.work,status:this.status,comments:this.comments}
    this.http.newTicket(this.headers,this.ticket).subscribe(
      res=>{if(res){this.getServiceTickets();alert("Ticket creado")}},
      err=>{this.logout()}
    )
  }
  changeStatus(id:string,status:boolean){
    let change
    if(status==true){status=false
    change={_id:id,status:status}
    }else if(status==false){status=true
      change={_id:id,status:status}
      }
    this.http.changeStatus(this.headers,change).subscribe(
      res=>{this.getServiceTickets()},
      err=>{console.log(err)}
    )
  }
  deleteTicket(id:string){
    let idformat={_id:id}
      this.http.deleteTicket(this.headers,idformat).subscribe(
        res=>{this.getServiceTickets()},
        err=>{console.log(err)}
      )
    this.getServiceTickets()
  }
}
