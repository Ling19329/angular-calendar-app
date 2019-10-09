import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsDlgComponent } from './add-students-dlg.component';

describe('AddStudentsDlgComponent', () => {
  let component: AddStudentsDlgComponent;
  let fixture: ComponentFixture<AddStudentsDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentsDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
