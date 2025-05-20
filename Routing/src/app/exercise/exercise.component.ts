import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercise',
  imports: [CommonModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {

  exercises : string[] = ['Bicep','Tricep','Chest','Leg','Shoulder',
                            'Quads','Bench Press','Pushups','Pullups'];
  queryObs : any ;
  activeRoute : ActivatedRoute = inject(ActivatedRoute)
  searchWord! : string | null;
  searchexer! : string[]

  ngOnInit(){

    this.queryObs = this.activeRoute.queryParamMap.subscribe((data)=>{
      this.searchWord = data.get('search')
      // console.log(this.searchWord)
      if(this.searchWord === undefined || this.searchWord === '' || this.searchWord === null){
        this.searchexer = this.exercises
      }else{
        this.searchexer = this.exercises.filter((exe)=>{
          return exe.toLowerCase().includes(this.searchWord!.toLowerCase())
        })
      }
    })
  }

}
