import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users:any

  oszlopok=[{key:"displayName", text: "Név", type:"text"},
  {key:"email", text:"Email cím", type:"text"}, 
  {key:"claims", text:"Jogosultság", type:"checkbox", 
  options:[
  {key:"sAdmin", text:"Szuper Admin"},
  {key:"admin", text:"Admin"},
  {key:"trader", text:"Kereskedő"},]
}, 
]

  constructor(private auth:AuthService){
    this.auth.getUsers().subscribe(
      (res)=>this.users=res
    )
  }

  saveClaims(user:any){
    this.auth.setUserClaims(user.uid,user.claims).subscribe(
      (res)=>console.log("User Claims sikeresen elmentve!")
    )
  }
}
