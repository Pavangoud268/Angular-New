import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username! : ElementRef;
  @ViewChild('password') password! : ElementRef;

  authService : AuthService = inject(AuthService)
  activeRoute : ActivatedRoute = inject(ActivatedRoute)
  router : Router = inject(Router)
  path! : any
  //location : Location = inject(Location)


  ngOnInit(){
    // this.path = this.activeRoute.snapshot.url
    // console.log(this.path)
    this.activeRoute.queryParamMap.subscribe((data)=>{
      const logout = Boolean(data.get('logout'))
      if(logout){
        this.authService.logout()
        alert('Logout')
      }
    })
  }

  onLogin(){
    const user = this.username.nativeElement.value
    const pass = this.password.nativeElement.value
    const userlog = this.authService.login(user,pass)
    if(userlog === undefined){
      alert('Invalid Credentails')
    }else{
      alert(`Welcome ${userlog.name} you are logged in to your account`)
    const target = this.authService.redirectPath ?? '/Home'
    this.authService.redirectPath = null
    this.router.navigate([target])
    }
  }
}
