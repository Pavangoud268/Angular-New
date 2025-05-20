import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { filter, from, map, of } from 'rxjs';

@Component({
  selector: 'observe-of',
  imports: [CommonModule],
  templateUrl: './observe-of.component.html',
  styleUrl: './observe-of.component.css'
})
export class ObserveOfComponent {
  data : any = []
  msg! : string
  array1 = [1,2,3,4,5]
  array2 = ['A','B','C','D','E']
  name = <string>('Pavan')
  promiseData = new Promise((resolve,reject)=>{
    resolve([10,20,30,40,50])
  })
  // observable = of(this.array1,this.array2,6,7,'Pavan','Goud')
  observable = from(this.array1)
  mapObs = this.observable.pipe(map((val)=>{
    return val*10
  }),filter((val)=>{
    return val>19
  }))
  filterObs = this.mapObs.pipe(filter((val)=>{
    return val>20
  }))

  onSubscribed(){
  this.mapObs.subscribe({
      next:(val)=>{
        this.data.push(val)
      },
      complete: () => {
        this.msg = 'Data is completely Streamed';
      }
    })
  }


}
