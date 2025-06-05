import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiCallsService } from '../Service/api-calls.service';
import { apiData } from '../Model/apiData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intern',
  imports: [RouterLink,CommonModule],
  templateUrl: './intern.component.html',
  styleUrl: './intern.component.css'
})
export class InternComponent {

  activeRoute : ActivatedRoute = inject(ActivatedRoute)

  internId! : number

  apiService : ApiCallsService = inject(ApiCallsService)

  selectedinterns! : any

  ngOnInit(){
 this.activeRoute.paramMap.subscribe((data)=>{
      this.internId = Number(data.get('id'))
    })

    this.apiService.getSingleData(this.internId).subscribe((data)=>{
        this.selectedinterns = data
    })

  }

}
