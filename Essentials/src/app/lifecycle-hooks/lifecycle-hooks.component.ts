import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lifecycle-hooks',
  imports: [],
  templateUrl: './lifecycle-hooks.component.html',
  styleUrl: './lifecycle-hooks.component.css'
})
export class LifecycleHooksComponent implements OnChanges{
  name : string = 'Pavan'
  @Input() heading! : string;
  // constructor(){
  //   console.log(this.name)
  //   console.log(this.heading)
  // }
  ngOnInit(){
    console.log('ngOnInit Life Cycle Hook')
  }
  ngOnChanges(changes : SimpleChanges){
    console.log('ngOnChanges Life Cycle Hook')
    //console.log(this.heading)
    // console.log(changes)
    // console.log(changes['heading'].previousValue)
    // console.log(changes['heading'].currentValue)
  }

  ngDoCheck(){
    console.log('ngDoCheck Life Cycle Hook')
  }
  ngAfterContentInit(){
    console.log('ngAfterContentInit Life Cycle Hook')
  }
  ngAfterContentChecked(){
    console.log('ngAfterContentChecked Life Cycle Hook')
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit Life Cycle Hook')
  }
  ngAfterViewChecked(){
    console.log('ngAfterViewChecked Life Cycle Hook')
  }
  ngOnDestroy(){
    console.log('ngOnDestroy Life Cycle Hook')
  }
}
