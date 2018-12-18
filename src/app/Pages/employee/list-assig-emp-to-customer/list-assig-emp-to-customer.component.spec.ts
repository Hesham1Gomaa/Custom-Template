import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssigEmpToCustomerComponent } from './list-assig-emp-to-customer.component';

describe('ListAssigEmpToCustomerComponent', () => {
  let component: ListAssigEmpToCustomerComponent;
  let fixture: ComponentFixture<ListAssigEmpToCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAssigEmpToCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssigEmpToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
