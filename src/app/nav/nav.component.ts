import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  
  sAdmin=false

  constructor(public auth:AuthService, private router:Router)
  {
    this.auth.getIsSAdmin().subscribe(
      (res)=>{
        this.sAdmin=res;
        console.log("navbar",this.sAdmin)
      }
    )

  }
  signOut(){
    this.auth.signOut().then(
      ()=>this.router.navigate(['/home'])
    ).catch((e)=>console.log(e))
  }
}
