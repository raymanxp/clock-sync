import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, interval, Observable, Subscription, merge, combineLatest } from 'rxjs';
import { withLatestFrom, map, tap, mergeMap } from 'rxjs/operators';
import { Constants } from './constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {

  readonly timeInputFormat = moment.HTML5_FMT.TIME_SECONDS;

  private timeSubject: Subject<Date>;
  private intervalSub: Subscription;

  constructor() {
    this.timeSubject = new BehaviorSubject(moment().toDate());
    this.startClock();
  }

  getTime$(): Observable<Date> {
    return this.timeSubject.asObservable();
  }

  setTime(newTime: string): void {
    const updateTime = moment(newTime, this.timeInputFormat);
    if (updateTime.isValid()) {
      this.timeSubject.next(updateTime.toDate());
    } else {
      console.error(`invalid time input [${newTime}] [${updateTime}]`);
    }
  }

  ngOnDestroy(): void {
    this.timeSubject.complete();
    this.intervalSub.unsubscribe();
  }

  private startClock(): void {
    this.intervalSub = interval(Constants.OnSecond).pipe(
      withLatestFrom(this.timeSubject),
      map(([intervalValue, time]) => time),
      map((time: Date) => moment(time).add(1, 's').toDate()),
      tap((time: Date) => this.timeSubject.next(time)),
      // tap(console.log)
    ).subscribe();
  }
}
