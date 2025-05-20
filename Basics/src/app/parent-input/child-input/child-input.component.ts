import { Component, EventEmitter, input, Input, Output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Child2Component } from '../child-2/child-2.component';

@Component({
  selector: 'child-input',
  imports: [FormsModule],
  templateUrl: './child-input.component.html',
  styleUrl: './child-input.component.css'
})
export class ChildInputComponent {
  // fullName = input<string>('');
  // value = input<number>(0);
  @Input({required: true}) company : string = ''
  @Input() fullName : string = ''
  @Input({transform: change}) value : number = 0
  newName : string = ''
  @Output()
  detectChange = new EventEmitter<string>()

  changeCompany(pavan : HTMLInputElement){
    this.detectChange.emit(pavan.value)
  }

  @Output()
  detectName = new EventEmitter<string>()



  changeName(){
    this.detectName.emit(this.newName)
  }
}

function change(value : number | undefined): string{
  return `${value} Years`
}
