import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth/signin', { email, password }).pipe(
      map((token) => {
        console.log('token', token);
        console.log('tooken');
      })
    );
  }
}
