import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPOsComponent } from './list-pos.component';

describe('ListPOsComponent', () => {
  let component: ListPOsComponent;
  let fixture: ComponentFixture<ListPOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
