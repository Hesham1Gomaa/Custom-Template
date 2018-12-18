import { TestBed } from '@angular/core/testing';

import { CreatePOService } from './create-po.service';

describe('CreatePOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatePOService = TestBed.get(CreatePOService);
    expect(service).toBeTruthy();
  });
});
