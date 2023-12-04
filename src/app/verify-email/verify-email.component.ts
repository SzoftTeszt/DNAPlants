import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  constructor(private auth:AuthService){}

  sendVerificationEmail(){
    this.auth.sendVerificationEmail()
  }
}

