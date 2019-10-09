import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
MatFormFieldModule,
MatInputModule,
MatCardModule,
MatButtonModule
} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@NgModule({
  declarations: [ 
    AuthComponent, 
    LoginComponent, 
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [AlertComponent]
})
export class AuthModule { }
