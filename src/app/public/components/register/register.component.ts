import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
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
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
    },
    {
      validators: CustomValidators.passwordsMatching,
    }
  );

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  register() {
    if (this.form.valid) {
      this.authService
        .create({
          email: this.email.value,
          password: this.password.value,
          lastName: this.lastName.value,
          firstName: this.firstName.value,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: (error) => {
            this.snackbar.open(
              `User could not be created, due to: ${error}`,
              'Close',
              {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          },
        });
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

  get firstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }
}
