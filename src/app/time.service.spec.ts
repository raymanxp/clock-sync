import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TimeService } from './time.service';
import { Subscription } from 'rxjs';

describe('TimeService', () => {
  let service: TimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it('should be created', () => {
    service = TestBed.inject(TimeService);
    expect(service).toBeTruthy();
  });

  it('getTime$ should emit every second', fakeAsync(() => {
    let timeWindow = [];
    const mockToday = new Date(2020, 3, 13);
    jasmine.clock().mockDate(mockToday);
    service = TestBed.inject(TimeService);

    const sub: Subscription = service.getTime$().subscribe(v => timeWindow = [...timeWindow, v]);
    tick(2001);

    expect(timeWindow.length).toBe(3);
    for (let i = 0; i++; i < timeWindow.length) {
      expect(timeWindow[i]).toBeGreaterThan(timeWindow[i + 1]);
    }
    tick();
    sub.unsubscribe();
    service.ngOnDestroy();
  }));
});
