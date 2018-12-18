import { TestBed } from '@angular/core/testing';

import { DaysregistrationService } from './daysregistration.service';

describe('DaysregistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaysregistrationService = TestBed.get(DaysregistrationService);
    expect(service).toBeTruthy();
  });
});
