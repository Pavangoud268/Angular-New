import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiCallsService } from '../Service/api-calls.service';
import { apiData } from '../Model/apiData';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showSearch : boolean = false
  apiService : ApiCallsService = inject(ApiCallsService)
  apiData! : any
  searchQuery : string = ''
  filteredData : any = []
  router : Router = inject(Router)

  ngOnInit(){
    this.apiService.Getdata().subscribe((data ) =>{
      console.log(data)
      this.apiData = data
    })
    this.filteredData = [];
  }
  onSearchInput() {
  const query = this.searchQuery.trim().toLowerCase();
  if (!query) {
    this.filteredData = [];
    return;
  }
  this.filteredData = this.apiData.filter((data: any) =>
    data.name.toLowerCase().includes(query)
  );
}
  toIntern(id : number){
    this.router.navigate(['interns',id])
  }
}
