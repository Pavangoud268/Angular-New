import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivityServiceService } from '../Services/activity-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { activity } from '../Module/activity';

@Component({
  selector: 'app-activites',
  imports: [CommonModule,RouterLink],
  templateUrl: './activites.component.html',
  styleUrl: './activites.component.css'
})

export class ActivitesComponent implements OnInit {
  activiteService  = inject(ActivityServiceService)

  activites! : activity[]

  activeRoute : ActivatedRoute = inject(ActivatedRoute)

  ngOnInit(){
    this.activites = this.activeRoute.snapshot.data['courses']
  }
}

