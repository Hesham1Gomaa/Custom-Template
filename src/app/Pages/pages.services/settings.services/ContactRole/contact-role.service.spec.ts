import { TestBed } from '@angular/core/testing';

import { ContactRoleService } from './contact-role.service';

describe('ContactRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactRoleService = TestBed.get(ContactRoleService);
    expect(service).toBeTruthy();
  });
});
