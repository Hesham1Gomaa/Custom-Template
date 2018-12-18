import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigEmpToCustomerComponent } from './assig-emp-to-customer.component';

describe('AssigEmpToCustomerComponent', () => {
  let component: AssigEmpToCustomerComponent;
  let fixture: ComponentFixture<AssigEmpToCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigEmpToCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigEmpToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
