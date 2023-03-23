import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
export interface LoginForm {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  constructor(private http: HttpClient) {}
  appRoot = environment.appRoot;
  login(loginForm: LoginForm) {  
    console.log(this.appRoot );
    return this.http.post<any>(`${this.appRoot}auth/signin`, {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
      
        return token;
      })
    )
  }
}
