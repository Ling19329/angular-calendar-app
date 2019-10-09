import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BackendService } from './_services/backend.service';
import { UtilityService } from './_services/utility.service';
import { HomeModule } from './pages/home/home.module';
import { AuthModule } from './pages/auth/auth.module';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor} from './_helpers/error.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: function tokenGetter() {
                    return localStorage.getItem('access_token');
                },
                whitelistedDomains: ['localhost:3000'],
                blacklistedRoutes: ['http://localhost:3000/auth/login']
            }
        }),
        HomeModule,
        AuthModule
    ],
    exports: [
        FlexLayoutModule,
    ],
    providers: [
        BackendService, 
        UtilityService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
