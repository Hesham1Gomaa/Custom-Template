import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoitemdescroptionComponent } from './poitemdescroption.component';

describe('PoitemdescroptionComponent', () => {
  let component: PoitemdescroptionComponent;
  let fixture: ComponentFixture<PoitemdescroptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoitemdescroptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoitemdescroptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
