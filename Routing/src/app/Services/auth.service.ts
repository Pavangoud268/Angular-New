import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Module/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged : Boolean = false
  userService : UserService = inject(UserService)
  userExist! : User | undefined
  redirectPath: string | null = null

  login(username : string,password:string){
    this.userExist = this.userService.users.find((use)=>use.username === username
                                                      && use.password === password)
    if(this.userExist === undefined){
      this.isLogged = false
    }else{
      this.isLogged = true
    }
    return this.userExist
  }

  logout(){
    this.isLogged = false
  }
  IsAuthenticated(){
    return this.isLogged
  }
}
