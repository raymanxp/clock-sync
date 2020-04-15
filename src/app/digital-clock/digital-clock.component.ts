import { Component, OnInit, HostBinding } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent implements OnInit {

  digitalInput: string;
  @HostBinding('class.card') cardClass = true;

  constructor(public readonly timeService: TimeService) { }

  ngOnInit(): void {
  }

  onUpdateDigitalTime(): void {
    this.timeService.setTime(this.digitalInput);
  }

}
