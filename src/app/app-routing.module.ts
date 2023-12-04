import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserListComponent } from './user-list/user-list.component';
import { sadminGuard } from './sadmin.guard';

const routes: Routes = [
  {path:"signup", component:SignUpComponent},
  {path:"home", component:HomeComponent},
  {path:"verifyemail", component:VerifyEmailComponent},
  {path:"signin", component:SignInComponent},
  {path:"forgotpassword", component:ForgotPasswordComponent},
  {path:"userList", component:UserListComponent, canActivate:[sadminGuard]},


  {path:"", component:HomeComponent},
  {path:"**", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
