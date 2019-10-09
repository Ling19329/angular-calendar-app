import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service'
import { AlertService } from '../../../_services/alert.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    errorMessage: string;
    returnUrl: string;

    constructor
    (
        private formBuilder: FormBuilder,
        private authService: AuthenticationService, 
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService
        
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.errorMessage = '';
        if (this.authService.currentUserValue) {
            this.navigateTo('calendar');
        }

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';
    }

    get f() { return this.loginForm.controls; }

    onSubmit(){
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public navigateTo(url?: string) {
        url = url || 'nav';
        this.router.navigate([url], { replaceUrl: true });
    }

}
