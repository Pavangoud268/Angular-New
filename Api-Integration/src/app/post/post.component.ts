import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { ApiCallsService } from '../Service/api-calls.service';

@Component({
  selector: 'app-post',
  imports: [CommonModule, FormComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  apiService : ApiCallsService = inject(ApiCallsService)
  showForm : boolean = false
  receivedData! : any
  data : any
  ngOnInit(){
    this.apiService.Getdata.subscribe((data) => {
      this.receivedData = data})

  }
  callApi(){
    setTimeout(()=>{
      this.apiService.Getdata.subscribe((data) => {
        this.receivedData = data})
    },3000)
  }
  recieveData(formdata : any){
    this.showForm = ! this.showForm
    this.data = formdata
    this.apiService.postData(this.data).subscribe()
    this.callApi()

  }
  toggleShowForm(){
    this.showForm = ! this.showForm
  }
  deleteUser(id : number){
    this.apiService.deleteData(id).subscribe()
    this.callApi()
  }



}
