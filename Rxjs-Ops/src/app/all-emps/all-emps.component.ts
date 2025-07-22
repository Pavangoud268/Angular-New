import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { employees } from '../Models/employees.interface';
import {
  combineLatest,
  combineLatestAll,
  concatMap,
  debounceTime,
  delay,
  filter,
  forkJoin,
  from,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { interval, fromEvent, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'all-emps',
  imports: [CommonModule],
  templateUrl: './all-emps.component.html',
  styleUrl: './all-emps.component.scss',
})
export class AllEmpsComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);
  protected empsData: employees[] = [];
  protected names: Array<string> = ['Pavan', 'Ukesh', 'Pranay', 'Abhinay'];
  protected heros: Array<string> = [
    'Prabhas',
    'Mahesh',
    'Pavan Kalyan',
    'NTR',
    'Ram Charan',
  ];
  // protected fromObs$ = from(this.names).pipe(delay(5000))
  protected fromObs$: Observable<string> = from(this.names).pipe(delay(2000));
  protected formObs2$: Observable<string> = from(this.heros).pipe(delay(5000));
  protected delay$: Observable<string> = from(this.names).pipe(
    mergeMap((name) => of(name).pipe(delay(5000))),
    take(5)
  );
  source = interval(1000);
  protected ofObs$: Observable<Observable<string>> = of(
    this.formObs2$,
    this.fromObs$
  );
  protected debounceSub = new Subject<string>();
  protected sub1 = of('Relangi');
  protected sub2: Observable<string> = of('Jaswanth').pipe(delay(4000));
  protected subSub2!: string;
  protected comb1: Observable<string> = from(['Relangi']).pipe(delay(1000));
  protected comb2: Observable<string> = from(['Jaswanth']).pipe(delay(2000));
  protected comb3: Observable<string> = from(['Pavan']).pipe(delay(3000));
  protected comb4: Observable<string> = from(['Goud']).pipe(delay(4000));
  protected combObs1$: Observable<Observable<string>> = of(
    this.comb1,
    this.comb2
  );
  protected combObs2$: Observable<Observable<string>> = of(
    this.comb3,
    this.comb4
  );

  ngOnInit(): void {
    // this.apiService.getData().subscribe((data)=>{
    //   this.empsData = data
    // })
    // this.apiService.getData().pipe(
    //   map((users) => users.filter(user => user.name.toLowerCase().includes('ra')))
    // ).subscribe((data)=>{
    //   this.empsData = data
    // })
    //this.fromObs$.pipe(take(3)).subscribe(data=> console.log(data))

    // const clicks = fromEvent(document, 'click');
    // this.source.pipe(takeUntil(this.fromObs$))
    // .subscribe(x => console.log(x));
    // this.delay$.pipe(tap(data=>console.log(data))).subscribe()
    //forkJoin([this.fromObs$,this.formObs2$]).subscribe(data=>console.log(data))
    //this.fromObs$.pipe(concatMap(name=>from(name).pipe(tap(name=>console.log(name)))),delay(2000)).subscribe()
    // this.fromObs$
    //   .pipe(
    //     concatMap((data) =>
    //       of(data).pipe(
    //         tap((val) => console.log(val)),
    //         delay(2000) // to simulate delay between each item
    //       )
    //     )
    //   )
    //   .subscribe();
    //this.ofObs$.pipe(mergeMap(name=>from(name).pipe(tap(name=>console.log(name))))).subscribe()
    const debounceSub = new Subject<string>();
    this.debounceSub.pipe(debounceTime(2000)).subscribe((data) => {
      console.log(data);
    });
    this.debounceSub.next('Relangi');
    setTimeout(()=>this.debounceSub.next('Jaswanth'),3000)
    this.debounceSub.next('Pavan')
    //combineLatest([this.combObs1$.subscribe(),this.combObs2$.subscribe()]).subscribe(data=>console.log(data))
  }
  consoleData() {
    this.fromObs$.subscribe((data) => console.log(data));
  }
}
