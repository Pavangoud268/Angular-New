import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'subject',
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {

  ngOnInit(){
    // let observable = new Observable((obs)=>obs.next(Math.random()))

    // observable.subscribe((data)=>console.log('Observable subscriber-1',data))
    // observable.subscribe((data)=>console.log('Observable subscriber-2',data))


    // let subject = new Subject()

    // subject.subscribe((data)=>console.log('Subject subscriber-1',data))
    // subject.subscribe((data)=>console.log('Subject subscriber-2',data))

    // subject.next(Math.random())

    // const subject = new Subject()
    // const data = ajax('https://randomuser.me/api/')
    // subject.subscribe((res)=>console.log(res))
    // subject.subscribe((res)=>console.log(res))
    // subject.subscribe((res)=>console.log(res))

    // data.subscribe(subject)

    const behaveSubject = new BehaviorSubject<string>('Jaswanth')
    // const behaveSubject = new ReplaySubject<string>(3)
    behaveSubject.subscribe((val)=>console.log('BehaviorSubject sub-0',val))
    behaveSubject.next('Pavan ')
    behaveSubject.next('Goud')
    // behaveSubject.complete()

    behaveSubject.subscribe((val)=>console.log('BehaviorSubject sub-1',val))
    behaveSubject.next('Jaswanth Pavan Goud')
    behaveSubject.subscribe((val)=>console.log('BehaviorSubject sub-2',val))

    const replaySubject = new ReplaySubject<string>(2)
    replaySubject.subscribe((val)=>console.log('ReplaySubject sub-0',val))
    replaySubject.next('Pavan')
    replaySubject.next('Goud')
    // behaveSubject.complete()

    replaySubject.subscribe((val)=>console.log('ReplaySubject sub-1',val))
    replaySubject.next('Jaswanth Pavan Goud')
    replaySubject.subscribe((val)=>console.log('ReplaySubject sub-2',val))

    const asyncSubject = new AsyncSubject()

    asyncSubject.next(100);
    asyncSubject.next(['A','B','C','D']);
    asyncSubject.next(100);

    asyncSubject.subscribe(data=>console.log(`Async Subject subscriber 1`,data))

    asyncSubject.complete()
    //asyncSubject.next(400);
    //asyncSubject.complete()

    asyncSubject.subscribe(data=>console.log(`Async Subject subscriber 2`,data))



  }

}
