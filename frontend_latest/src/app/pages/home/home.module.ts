import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { StudentsComponent } from './students/students.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component'
import { CreateSelectDlgComponent } from './create-select-dlg/create-select-dlg.component';
import { AddStudentsDlgComponent } from './add-students-dlg/add-students-dlg.component';
import { CustomMaterialModule } from '../../core/material.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    StudentsComponent,
    CreateSelectDlgComponent,
    AddStudentsDlgComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomMaterialModule,
    FullCalendarModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
  ],
  entryComponents: [CreateSelectDlgComponent, AddStudentsDlgComponent],
})
export class HomeModule { }
