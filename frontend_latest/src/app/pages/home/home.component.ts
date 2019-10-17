import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { IUser } from 'src/app/_interfaces/IUser';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );
    
    currentUser: IUser;
    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private authenticationService: AuthenticationService
        ) { }
    ngOnInit(){
        this.currentUser = this.authenticationService.currentUserValue;
    }
    onLogout(){
        this.authenticationService.logout();
        this.router.navigate(['/auth/login']);
    }

}
