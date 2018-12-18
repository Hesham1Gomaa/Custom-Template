import { TestBed } from '@angular/core/testing';

import { CustomerSettingService } from './customer-setting.service';

describe('CustomerSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerSettingService = TestBed.get(CustomerSettingService);
    expect(service).toBeTruthy();
  });
});
