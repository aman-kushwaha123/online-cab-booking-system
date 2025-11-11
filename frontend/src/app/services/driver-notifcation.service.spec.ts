import { TestBed } from '@angular/core/testing';

import { DriverNotifcationService } from './driver-notifcation.service';

describe('DriverNotifcationService', () => {
  let service: DriverNotifcationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverNotifcationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
