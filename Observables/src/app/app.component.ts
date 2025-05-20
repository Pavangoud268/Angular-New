import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ObserveOfComponent } from './observe-of/observe-of.component';
import { SubjectComponent } from './subject/subject.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,ObserveOfComponent,SubjectComponent,UnsubscribeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Observables';
  data : any[] = []

  onObservable = new Observable((observer)=> {
    setTimeout(()=>{observer.next(1)},1000)
    setTimeout(()=>{observer.next(2)},2000)
    setTimeout(()=>{observer.next(3)},3000)
    // setTimeout(()=>{observer.error(new Error('SomeThing wrong Happened'))},3000)
    setTimeout(()=>{observer.complete()},3000)
    setTimeout(()=>{observer.next(4)},4000)
    setTimeout(()=>{observer.next(5)},5000)
  })
  onSubscribed(){
  //   this.onObservable.subscribe((val : any)=>{
  //     this.data.push(val)
  //   }),
  //   (errr: { message: any })=>{alert(errr.message)}
  //
  this.onObservable.subscribe({
    next:(val)=>{
      this.data.push(val)
    },
    error(errr){
      alert(errr.message)
    },
    complete(){
      alert('Completed sending Data')
    }
  })
}
}
