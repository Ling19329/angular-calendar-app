import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component'
import { HandleScheduleDlgComponent } from './calendar/handle-schedule-dlg/handle-schedule-dlg.component';
import { AddStudentsDlgComponent } from './users/add-students-dlg/add-students-dlg.component';
import { CustomMaterialModule } from '../../core/material.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HandleCalendarDlgComponent } from './calendar/handle-calendar-dlg/handle-calendar-dlg.component';
import { AlertDlgComponent } from 'src/app/components/alert-dlg/alert-dlg.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    UsersComponent,
    HandleScheduleDlgComponent,
    AddStudentsDlgComponent,
    HandleCalendarDlgComponent,
    AlertDlgComponent
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
  entryComponents: [HandleScheduleDlgComponent, AddStudentsDlgComponent, HandleCalendarDlgComponent, AlertDlgComponent],
})
export class HomeModule { }
