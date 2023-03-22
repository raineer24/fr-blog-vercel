import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';

export interface LoginForm {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {  

    return this.http.post<any>('https://prisma-nest-raineer24.vercel.app/api/auth/signin', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
      
        return token;
      })
    )
  }
}
