import { Injectable } from "@angular/core"

@Injectable({
  providedIn : 'root'
})

export class DemoService{
  name : string = 'Relangi Jaswanth Pavan Goud'
  age : number = 22
  location : string = 'Hyderabad'
  bikes : string[] = ['Bajaj','Rx100','Royal Enfield','R15']
  getAllBikes(){
    return this.bikes
  }
  addBike(bike:string){
    this.bikes.push(bike)
  }
  deleteBike(id : number){
    this.bikes.splice(id,0)
  }
}
