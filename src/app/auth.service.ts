import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class AuthService {
  backendApi="https://us-central1-fnoveny.cloudfunctions.net/api"
  
  defClaims={sAdmin:false, admin:false, trader:false}
  
  userSub= new BehaviorSubject(null)
  user:any

  isSAdmin=new BehaviorSubject(false)

  constructor(private afAuth:AngularFireAuth,
    private router:Router, private http:HttpClient
    ) { 
      this.loadLoggedUser()
      
      this.getLoggedUser().subscribe(
        (user)=>console.log("User: ", user)
      );
    }

  getIsSAdmin(){
    return this.isSAdmin
  }
  getUserClaims(uid:any){
    const url=`/users/${uid}/claims`
    const headers = new HttpHeaders().set('Authorization', this.user.token)
    return this.http.get(this.backendApi+url,{headers})
  }  

  setUserClaims(uid:any, claims:any){
    const url=`/setCustomClaims`
    const body={ uid:uid, claims:claims}
    const headers = new HttpHeaders().set('Authorization', this.user.token)
    return this.http.post(this.backendApi+url,body,{headers})
  }

  loadLoggedUser(){
    this.afAuth.authState.subscribe(
      {
        next:(user)=>{
          this.user=user
          if (user) {            
            user.getIdToken().then(
              (token)=>{
                this.user.token=token
                this.getUserClaims(user.uid).subscribe({
                  next:(claims)=>{
                    if (claims) {
                      this.user.claims=claims
                      this.userSub.next(this.user)
                      console.log("Claims sadmin:",this.user.claims)
                      console.log("sadmin:",this.user.claims.sAdmin)
                      this.isSAdmin.next(this.user.claims.sAdmin)
                    }
                    else
                    { 
                      this.user.claims= this.defClaims
                      this.userSub.next(this.user)
                      this.setUserClaims(this.user.uid, this.defClaims).subscribe(
                      ()=>{}
                    )                    
                    }
                  },
                  error:(err)=>console.log("Hibuci:",err)}
              )                
              }   
            )           
          }
          else  {
            this.userSub.next(this.user)
            this.isSAdmin.next(false)
          }       

        }
      }
    )
  }  
  getLoggedUser(){
    return this.userSub 
    
  }

  getUsers(){
    const url=`/users`
    const headers = new HttpHeaders().set('Authorization', this.user.token)
    return this.http.get(this.backendApi+url,{headers})
  }

  forgotPassword(email:any){
    return this.afAuth.sendPasswordResetEmail(email)
  }

  signUp(email:any, password:any){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  sendVerificationEmail(){
    this.afAuth.currentUser.then(
      (user)=>user?.sendEmailVerification()
    ).then(()=>this.router.navigate(['/verifyemail']))
    .catch((e)=>console.log("Hiba",e))
  }

  signIn(email:any, password:any){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  googleAuth(){
    return this.afAuth.signInWithRedirect(new GoogleAuthProvider())

  }
  signOut(){
    this.user=null
    this.isSAdmin.next(false)
    this.userSub.next(this.user)  
    return this.afAuth.signOut()
  }
}
