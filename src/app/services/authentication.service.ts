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
  of,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserI } from '../model/user.interface';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'nestjs_chat_app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserI | null>;
  public user: Observable<UserI | null>;
  jwt: string | null = null;
  userInfo: any;
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router,
    private jwtHelper: JwtHelperService
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
    localStorage.removeItem('nestjs_chat_app');
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
          console.log('usedata', userData);
          localStorage.setItem('nestjs_chat_app', userData.access_token);
          localStorage.setItem('user', JSON.stringify(userData));
          this.userSubject.next(userData);
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

  isAuthenticated(): boolean {
    const token: any = localStorage.getItem(JWT_NAME);
    // console.log('token', token);
    return !this.jwtHelper.isTokenExpired(token);
  }
  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string | null) =>
        of(this.jwtHelper.decodeToken(jwt!)).pipe(
          map((jwt: any) => jwt!['sub'])
        )
      )
    );
  }
}
