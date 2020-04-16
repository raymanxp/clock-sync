import { TimeService } from './../time.service';
import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit {
  
  @HostBinding('class.card') cardClass = true;
  analogueInput: string;
  private hourElement: Element;
  private minElement: Element;
  private secElement: Element;
  private readonly hourInDegrees = 30;
  private readonly minInDegrees = 6;
  private readonly secInDegrees = 6;


  constructor(public readonly timeService: TimeService, private readonly elRef: ElementRef) { }

  ngOnInit(): void {
    this.hourElement = this.elRef.nativeElement.querySelector('#hour-hand');
    this.minElement = this.elRef.nativeElement.querySelector('#min-hand');
    this.secElement = this.elRef.nativeElement.querySelector('#sec-hand');
    this.timeService.getTime$().subscribe((time: Date) => {
      this.rotateHour(time);
      this.rotateMin(time);
      this.rotateSec(time);
    });
  }

  onUpdateAnalogueTime(): void {
    this.timeService.setTime(this.analogueInput);
  }

  private rotateHour(time: Date): void {
    this.rotate(this.hourElement, this.hourInDegrees * (time.getHours() % 12));
  }

  private rotateMin(time: Date): void {
    this.rotate(this.minElement, this.minInDegrees * time.getMinutes());
  }

  private rotateSec(time: Date): void {
    this.rotate(this.secElement, this.secInDegrees * time.getSeconds());
  }

  private rotate(el: Element, deg: number): void {
    el.setAttribute('transform', `rotate(${deg} 50 50)`);
  }
}
