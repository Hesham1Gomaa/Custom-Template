import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPaymentTypeComponent } from './setting-payment-type.component';

describe('SettingPaymentTypeComponent', () => {
  let component: SettingPaymentTypeComponent;
  let fixture: ComponentFixture<SettingPaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPaymentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
