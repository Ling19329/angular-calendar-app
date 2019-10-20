import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSelectDlgComponent } from './handle-schedule-dlg.component';

describe('CreateSelectDlgComponent', () => {
  let component: CreateSelectDlgComponent;
  let fixture: ComponentFixture<CreateSelectDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSelectDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSelectDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
