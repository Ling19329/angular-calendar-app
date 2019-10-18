import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCalendarDlgComponent } from './create-calendar-dlg.component';

describe('CreateCalendarDlgComponent', () => {
  let component: CreateCalendarDlgComponent;
  let fixture: ComponentFixture<CreateCalendarDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCalendarDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCalendarDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
