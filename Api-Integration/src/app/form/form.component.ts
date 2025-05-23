import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../Service/data.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ApiCallsService } from '../Service/api-calls.service';
import { apiData } from '../Model/apiData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  LoginForm : FormBuilder = inject(FormBuilder)

  reactiveForm! : FormGroup

  apiService : ApiCallsService = inject(ApiCallsService)

  router : Router = inject(Router)

  data! : apiData

  updateButton : boolean = false

  ngOnInit(){
    this.reactiveForm = this.LoginForm.group({
      name : ['',Validators.required],
      age : [null,Validators.required],
      joineddate :['',Validators.required],
      address : ['',Validators.required],
      skill : [null,Validators.required]
    })
    this.data = history.state.formData;
    // this.data = history.state;

    if (this.data) {
      this.reactiveForm.patchValue(this.data);
      this.updateButton = ! this.updateButton
    }
  }
  onSubmit() {
  console.log(this.reactiveForm.value);

  this.apiService.postData(this.reactiveForm.value).subscribe({
    next: (response) => {
      console.log('Data posted successfully:', response);
      this.router.navigate(['interns']);
    },
    error: (error) => {
      console.error('Error posting data:', error);
    }
  });
}


  updateApiData(){
    console.log(this.reactiveForm.value)
    const id : number = this.data.id
    this.apiService.putData(id,this.reactiveForm.value).subscribe()
   this.router.navigate(['interns'])
  }
  ngOnDestroy(){
    this.reactiveForm.reset()
  }


}
