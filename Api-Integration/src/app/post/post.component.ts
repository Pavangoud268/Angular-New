import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { ApiCallsService } from '../Service/api-calls.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { apiData } from '../Model/apiData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [CommonModule,RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  #apiService : ApiCallsService = inject(ApiCallsService);
  protected receivedData? : apiData[];
  #router : Router = inject(Router);
  #activeRoute : ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    // this.apiService.Getdata.subscribe((data) => {
    //   this.receivedData = data})
    // this.receivedData = this.activeRoute.snapshot.data['data']
    this.callApi();
  }
  protected callApi(){
      this.#apiService.Getdata().subscribe(res=>{
        console.log(res);
        this.receivedData = res;
      })
    }
  protected deleteUser(id : number){
  const confirmed = confirm("Are you sure you want to delete the Intern Record?");

  if (confirmed) {
    this.#apiService.deleteData(id).subscribe({
      next : ()=>{
        console.log('abc');
        this.callApi();
      }
    });
  }
  }
  protected sendData(id : number){
    this.#router.navigate(['form',id]);
  }
  protected toIntern(id : number){
    console.log('jhbhjcd');
    this.#router.navigate(['interns',id]);
  }
}
