import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-refs',
  imports: [CommonModule],
  templateUrl: './refs.component.html',
  styleUrl: './refs.component.css'
})
export class RefsComponent {
  state : string = 'Kashmir'
  places : string[] = ['Kasol','Parvathi Valley','Ladakh','Leh']
  budget : number = 50000
  duration : string = '15Days'
  noOfPpl : number = 10
  planschedule : boolean = true
  inputt : boolean = false
  people :string[] = []
  fullName : string = ''
  @ViewChild('ppl') ppll!: ElementRef;
  showInput(){
    this.inputt = !this.inputt
    if(!(this.ppll.nativeElement.value.trim() === ''))
    this.people.push(this.ppll.nativeElement.value)
    this.ppll.nativeElement.value = ''
  }
  @ViewChildren('inpel') inputElements! : QueryList<ElementRef>
  showFullName(){
    this.inputElements.forEach((el)=>{
      this.fullName +=' '+ el.nativeElement.value
    })
  }
}
