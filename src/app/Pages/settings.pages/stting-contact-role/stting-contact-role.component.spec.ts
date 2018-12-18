import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SttingContactRoleComponent } from './stting-contact-role.component';

describe('SttingContactRoleComponent', () => {
  let component: SttingContactRoleComponent;
  let fixture: ComponentFixture<SttingContactRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SttingContactRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SttingContactRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
