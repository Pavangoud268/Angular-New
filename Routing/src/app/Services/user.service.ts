import { Injectable } from '@angular/core';
import { User } from '../Module/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  users : User[] = [
    new User(1,'Pavan Goud','pg','12345'),
    new User(2,'Jaswanth Pavan','PJ','12345'),
    new User(3,'Prabhas Raju','PR','12345')
  ]
}
