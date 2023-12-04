import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userEmail:any;

  constructor(private auth:AuthService){}

  forgotPassword(){
    this.auth.forgotPassword(this.userEmail).then(
      ()=>alert('Password reset mail sent, check your inbox.')
      
    ).catch((e)=>console.log("Password reset email Error!!!"))
  }
}
