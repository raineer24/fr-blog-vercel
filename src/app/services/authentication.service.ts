import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserI } from '../model/user.interface';
export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  appRoot = environment.appRoot;
  login(loginForm: LoginForm) {
    console.log(this.appRoot);
    return this.http
      .post<any>(`${this.appRoot}/api/auth/signin`, {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log('token');
          return token;
        })
      );
  }

  create(user: UserI): Observable<UserI> {
    return this.http.post<UserI>(`${this.appRoot}/api/auth/register`, user).pipe(
      tap((createdUser: UserI) =>
        this.snackbar.open(
          `User ${createdUser.email} created successfully`,
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        )
      ),
      catchError((e) => {
        this.snackbar.open(
          `User could not be created, due to: ${e.error.message}`,
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        return throwError(e);
      })
    );
  }
}
