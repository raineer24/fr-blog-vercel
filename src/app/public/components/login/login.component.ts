import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  
  });
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  login() {
    if (this.form.valid) {
      this.authService
        .login({
          email: this.email.value,
          password: this.password.value,
      
        })
        .pipe(tap(() => this.router.navigate(['admin/over'])))
        .subscribe();
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }


}
