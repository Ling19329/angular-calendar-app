import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      }
    ],
    
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
