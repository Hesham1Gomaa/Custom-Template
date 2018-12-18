import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCustomerComponent } from './setting-customer.component';

describe('SettingCustomerComponent', () => {
  let component: SettingCustomerComponent;
  let fixture: ComponentFixture<SettingCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
