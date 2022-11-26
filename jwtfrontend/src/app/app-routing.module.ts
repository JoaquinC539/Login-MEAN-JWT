import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { DashGuard } from './dash-guard.guard';
import { HomeComponent } from './Components/home/home.component';


const routes: Routes = [
{path:"create",component:LoginComponent},
{path:"signup",component:SignupComponent},
{path:"dash",component:ProfileComponent, canActivate:[DashGuard]},
{path:"",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,SignupComponent,ProfileComponent,HomeComponent];
