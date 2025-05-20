import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../Services/data.service';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from '../exercise/exercise.component'; // Ensure the correct path to ExerciseComponent
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { AboutComponent } from "../about/about.component";

@Component({
  imports: [RouterLink, CommonModule, ExerciseComponent, SubscribeComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data = inject(DataService)
  homeTitle : string = this.data.homeTitle
  tagLine : string = this.data.tagLine
  services : string[] = this.data.services
  router : Router = inject(Router)
  activeRoute : ActivatedRoute  = inject(ActivatedRoute)

  toAbout(){
    //this.router.navigate(['About'])
    this.router.navigateByUrl('About')
  }
  onSearch(value : string){
    this.router.navigate(['/Exercise'],{queryParams:{search : value}})
  }
  ngOnInit(){
    this.activeRoute.fragment.subscribe((data)=>{
      // console.log(data)
      if(data !== null){
        this.toFragment(data)
      }

    })
  }
  toFragment(id : string){
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  }
}
