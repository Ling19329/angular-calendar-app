import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: ConfirmPasswordValidator.MatchPassword
      });

    if (this.authService.currentUserValue) {
      this.navigateTo('calendar');
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    if (this.registerForm.invalid) {
      console.log('register invalid');
      return;
    }

    this.authService.register(this.f.email.value, this.f.firstName.value, this.f.lastName.value, this.f.password.value, this.f.confirmPassword.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.loading = false;
            });
}

  public navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }
}
