import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnvoicesComponent } from './list-envoices.component';

describe('ListEnvoicesComponent', () => {
  let component: ListEnvoicesComponent;
  let fixture: ComponentFixture<ListEnvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
