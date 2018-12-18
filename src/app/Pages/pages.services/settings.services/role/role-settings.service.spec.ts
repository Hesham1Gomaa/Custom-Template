import { TestBed } from '@angular/core/testing';

import { RoleSettingsService } from './role-settings.service';

describe('RoleSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleSettingsService = TestBed.get(RoleSettingsService);
    expect(service).toBeTruthy();
  });
});
