import { Component, inject, OnInit } from '@angular/core';
import { ActivityServiceService } from '../Services/activity-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { activity } from '../Module/activity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-activity',
  imports: [CommonModule],
  templateUrl: './show-activity.component.html',
  styleUrl: './show-activity.component.css'
})
export class ShowActivityComponent implements OnInit {
  serviceActivites = inject(ActivityServiceService)
  // activity = this.serviceActivites.activites
  activity! : activity[]
  activeRoute : ActivatedRoute = inject(ActivatedRoute)
  activityId! : number;
  selectedActivity : activity | undefined
  router : Router = inject(Router)
  actSub : any;

  ngOnInit(){
    //this.activityId = Number(this.activeRoute.snapshot.params['id'])
    // this.activityId = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.activity = this.activeRoute.snapshot.data['course']
    this.actSub = this.activeRoute.paramMap.subscribe((data)=>{
      console.log(data.get('id'))
      this.activityId = Number(data.get('id'))
      this.selectedActivity = this.activity.find((act) => act.id === this.activityId)
    })
  }

  onCommitmentChange(){
    if (this.selectedActivity) {
      this.selectedActivity.commitment = !this.selectedActivity.commitment;
    }
  }

  toNext(){
     if(this.activityId < 4){
      this.router.navigate(['Service',(this.activityId+1)])
    }
  }
  toPrevious(){
    if(this.activityId > 1){
      this.router.navigate(['Service',(this.activityId-1)])
    }
  }
}

