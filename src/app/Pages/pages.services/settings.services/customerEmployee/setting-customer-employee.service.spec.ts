import { TestBed } from '@angular/core/testing';

import { SettingCustomerEmployeeService } from './setting-customer-employee.service';

describe('SettingCustomerEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingCustomerEmployeeService = TestBed.get(SettingCustomerEmployeeService);
    expect(service).toBeTruthy();
  });
});
