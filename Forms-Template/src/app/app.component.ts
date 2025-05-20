import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Forms-Template';
@ViewChild('formel') form! : NgForm
buttons = [
  {value:'male',label : "Male"},
  {value:'female',label : "Female"},
  {value:'others',label : "Prefer Not to say"}
]

  onFormSubmitted(){
    console.log(this.form)
    this.Namee = this.form.value.Name
    this.Lname = this.form.value.LastName
    this.age = this.form.value.Age
    this.username = this.form.value.Username
    this.dob = this.form.value.Dob
    this.location = this.form.value.Location
    this.country = this.form.value.country
    //this.form.reset()
  }
  Namee : string = ''
  Lname : string = ''
  age? : number
  username : string = ''
  dob : string = ''
  location : string = ''
  country : string = ''

  generateUsername(){
    this.username = this.Namee + this.Lname + String(this.age);
    console.log(this.username)
    this.form.form.patchValue({
      Username : this.username
    })
  }
  reset(){
    this.form.reset()
  }
}
