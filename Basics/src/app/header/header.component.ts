import { Component, computed, effect, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {signal} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title :string = 'Basics';
  names : string[] = ['Relangi','Jaswanth','Pavan','Goud']
  company = signal('Ariqt')
  details  = signal({
    name:'Relangi Jaswanth Pavan Goud',
    age: 22,
    location:"Hyderabad"
  })
  reactivity = signal('Pavan')
  description(){
    return `${this.details().name} is ${this.details().age}
    years old, currently living in ${this.details().location}`
  }
  changeTitle(){
    this.title='Essentials'
  }
  changeReactivity(){
    this.reactivity.set("Jaswanth Pavan Goud")
    this.changed.set(true)
  }
  updateReactivity(){
    this.reactivity.update(n=>"Relangi " + n)
    this.updated.set(true)
  }
  onChange(event : any){
    this.company.set(event.target.value)
  }
  length = computed(()=> this.reactivity().length)
  changed = signal(false)
  updated = signal(false)
  cartValue : number = 0
  effectDetection = signal(0)
  decrement(){
    if(this.cartValue > 0){
      this.cartValue--
    }
  }
  increment(){
    this.cartValue++
    this.effectDetection.update((num)=>num += 1)
  }
  constructor(){
    effect(()=>{
      // console.log(this.cartValue)
      // this.effectDetection.update((num)=>num += 1)
      // console.log(this.effectDetection())
      console.log(`Name is set to ${this.reactivity()} and the length is ${untracked(() => this.effectDetection())}`)
    })
  }
  logCount = effect(()=>{
    console.log(`Name is changed to ${this.reactivity()}`)
    // this.effectDetection.update((num)=>num += 1)
    console.log(this.effectDetection())
  })
  searchWord : string = 'Angular'
 }
