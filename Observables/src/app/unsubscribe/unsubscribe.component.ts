import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  imports: [CommonModule],
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.css'
})
export class UnsubscribeComponent {
  counter = interval(1000)
  data : number[] = []
  subscriber: any;

  onSubscribe(){
    this.subscriber = this.counter.subscribe(val=>{
      this.data.push(val)
    })
  }

  onUnSubscribe(){
    this.subscriber.unsubscribe()
  }


}
