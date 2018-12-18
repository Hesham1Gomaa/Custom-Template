import { TestBed } from '@angular/core/testing';

import { AssignEmpTopoService } from './assign-emp-topo.service';

describe('AssignEmpTopoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignEmpTopoService = TestBed.get(AssignEmpTopoService);
    expect(service).toBeTruthy();
  });
});
