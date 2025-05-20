import { Component } from '@angular/core';
import { ChildInputComponent } from './child-input/child-input.component';
import { Child2Component } from './child-2/child-2.component';

@Component({
  selector: 'parent-input',
  standalone : true,
  imports: [ChildInputComponent,],
  templateUrl: './parent-input.component.html',
  styleUrl: './parent-input.component.css'
})
export class ParentInputComponent {
  name : string ='Pavan Goud'
  ages : number = 22
  company : string = 'Ariqt'

  changeParentCompany(event : string){
    this.company = event
  }
  changeParentName(event: string){
    this.name = event
  }
}
