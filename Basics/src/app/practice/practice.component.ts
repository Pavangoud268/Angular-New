import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'practice',
  imports: [CommonModule,FormsModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent {
  name : string = 'Prabhas Raju'
  movies = [{movie:'Salaar',inp : false},
    {movie:'Bahubali-2',inp : false},
    {movie:'Saaho',inp : false},
    {movie:'Kalki-2898AD',inp : false},
    {movie:'Mirchi',inp : false}]
  newMve : string = ''
  showInp : boolean = false
  deleteMve(i : number){
    this.movies.splice(i,1)
  }
  addMve(newMve : string){
    if(!(newMve.trim()  === '')){
      let newMveObj = {movie:newMve,inp:false}
      this.movies.push(newMveObj)
      this.newMve = ''
    }

  }
  inputShow(i : number){
    this.movies[i].inp = !this.movies[i].inp
  }
  updateMve(event : any,i:number){
    this.movies[i].movie = event.target.value
  }

}
