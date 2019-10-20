import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleCalendarDlgComponent } from './handle-calendar-dlg.component';

describe('HandleCalendarDlgComponent', () => {
  let component: HandleCalendarDlgComponent;
  let fixture: ComponentFixture<HandleCalendarDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleCalendarDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleCalendarDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
