import { Injectable } from '@angular/core';
import { activity } from '../Module/activity';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  constructor() { }
  activites : activity[] = [
    {id:1,name:'Weight Loss',about:'About to loose Weight',duration:12,commitment:true},
    {id:2,name:'Weight Gain',about:'About to Gain Weight',duration:10,commitment:true},
    {id:3,name:'Muscle Gain',about:'About to Gain Muscle',duration:8,commitment:true},
    {id:4,name:'Physical Fitness',about:'About to acheive Physical Fitness',duration:6,commitment:true}
  ]
  getActivites(){
    return new Observable<activity[]>((sub )=>{
        setTimeout(()=>{
          sub.next(this.activites)
        },2000)
      })
  }
}

