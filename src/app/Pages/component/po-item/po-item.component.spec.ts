import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoItemComponent } from './po-item.component';

describe('PoItemComponent', () => {
  let component: PoItemComponent;
  let fixture: ComponentFixture<PoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
