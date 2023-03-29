import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map,
  tap,
  switchMap,
  catchError,
  Observable,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserI } from '../model/user.interface';
import { Router } from '@angular/router';
export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserI | null>;
  public user: Observable<UserI | null>;
  userInfo: any;
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  appRoot = environment.appRoot;

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/public/login']);
  }

  login(loginForm: LoginForm) {
    console.log(this.appRoot);
    return this.http
      .post<any>(`${this.appRoot}/api/auth/login`, {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((userData) => {
          localStorage.setItem('nestjs_chat_app', userData.access_token);
          localStorage.setItem('user', JSON.stringify(userData.userData));
          this.userSubject.next(userData.userData);
          return userData;
        })
      );
  }

  create(user: UserI): Observable<UserI> {
    return this.http
      .post<UserI>(`${this.appRoot}/api/auth/register`, user)
      .pipe(
        tap((createdUser: UserI) => {
          this.userInfo = createdUser;

          this.snackbar.open(
            `User ${this.userInfo.user['email']} created successfully`,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
        }),
        catchError((e) => {
          console.log('e', e.error);
          this.snackbar.open(
            `User could not be created, due to: ${e.error}`,
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
