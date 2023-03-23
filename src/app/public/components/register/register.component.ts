import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),

      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    {
      validators: CustomValidators.passwordsMatching,
    }
  );

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  register() {
    if (this.form.valid) {
      this.authService
        .create({
          email: this.email.value,
          password: this.password.value,
        })
        .pipe(tap(() => this.router.navigate(['../login'])))
        .subscribe();
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }
}
