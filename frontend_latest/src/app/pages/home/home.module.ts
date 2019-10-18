import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component'
import { CreateSelectDlgComponent } from './create-select-dlg/create-select-dlg.component';
import { AddStudentsDlgComponent } from './add-students-dlg/add-students-dlg.component';
import { CustomMaterialModule } from '../../core/material.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateCalendarDlgComponent } from './create-calendar-dlg/create-calendar-dlg.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    UsersComponent,
    CreateSelectDlgComponent,
    AddStudentsDlgComponent,
    CreateCalendarDlgComponent,
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
  entryComponents: [CreateSelectDlgComponent, AddStudentsDlgComponent, CreateCalendarDlgComponent],
})
export class HomeModule { }
