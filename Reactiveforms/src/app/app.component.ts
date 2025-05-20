import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Reactiveforms';

  reactiveForm! : FormGroup
  formdata : any = {}

  ngOnInit(){
    this.reactiveForm = new FormGroup({
      firstname : new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
      lastName : new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
      userName : new FormControl(null),
      email : new FormControl('',[Validators.required,Validators.email]),
      age : new FormControl(null),
      dob : new FormControl(null,Validators.required),
      sex : new FormControl('male'),
      address : new FormGroup({
        country : new FormControl('',Validators.required),
        city : new FormControl('',Validators.required),
        pincode : new FormControl(null,Validators.required),
      }),
      languages : new FormArray([
        new FormControl(null),
      ]),
      dynamicskills : new FormArray([
        new FormGroup({
          skill : new FormControl(null),
          exp : new FormControl(null),
          rating : new FormControl(null)
      })
      ]),
    },Validators.required)

    // this.reactiveForm.get('firstname')?.valueChanges.subscribe((val)=> console.log(val))
    //this.reactiveForm.valueChanges.subscribe((val)=> console.log(val))
  }

  onSubmit(){
    // console.log(this.reactiveForm)
    // console.log(this.reactiveForm.value.firstname)
    this.formdata = this.reactiveForm.value
    console.log(this.formdata)
    this.reactiveForm.reset()
  }
  get controls(){
    return ((this.reactiveForm.get('languages')) as FormArray).controls
  }
  addLang(){
    ((this.reactiveForm.get('languages')) as FormArray)
    .push(new FormControl(null,Validators.required))
  }
  deleteLang(i : number){
    const del = (this.reactiveForm.get('languages')) as FormArray
    del.removeAt(i)
  }
  get arraySkills(){
    return <FormArray>this.reactiveForm.get('dynamicskills')
  }
  addgroupskills(){
    this.arraySkills.push(
      new FormGroup({
        skill : new FormControl(null),
        exp : new FormControl(null),
        rating : new FormControl(null)
      })
    )
  }
  deletegroupskill(i:number){
    this.arraySkills.removeAt(i)
  }
  genUserName(){
    const firstName = this.reactiveForm.get('firstname')?.value
    const lastName = this.reactiveForm.get('lastName')?.value
    const age = this.reactiveForm.get('age')?.value
    const userName = firstName + lastName + age;
    this.reactiveForm.get('userName')?.setValue(userName)
    this.reactiveForm.get('languages')?.setValue(['English'])
    const skill = (this.reactiveForm.get('dynamicskills') as FormArray).at(0).get('skill')
    skill?.setValue('Angular')
    this.reactiveForm.patchValue({
      email : 'pavangoud268@gmail.com',
    })
    const exp = (this.reactiveForm.get('dynamicskills') as FormArray)
    exp.at(0).patchValue({
      exp : 3
    })

  }

}
