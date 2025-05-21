import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  LoginForm : FormBuilder = inject(FormBuilder)

  reactiveForm! : FormGroup

  ngOnInit(){
    this.reactiveForm = this.LoginForm.group({
      name : ['',Validators.required],
      age : [null,Validators.required],
      address : ['',Validators.required],
      skill : [null,Validators.required]
    })
  }
  onSubmit(){
    console.log(this.reactiveForm.value)
    this.sendFormdata.emit(this.reactiveForm.value)
  }
  @Output() sendFormdata = new EventEmitter()

}
