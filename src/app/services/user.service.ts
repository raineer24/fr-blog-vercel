import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserI } from '../model/user.interface';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

export interface UserData {
  results: UserI[];
  pagination: {
    length: number;
    size: number;
    lastPage: number;
    page: number;
    startIndex: number;
    endIndex: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  appRoot = environment.appRoot;
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<UserI> {
    return this.http.get(`${this.appRoot}/api/users/` + id).pipe(
      map((user: UserI) => {
        return user;
      })
    );
  }

  updateOne(user: any): Observable<UserI> {
    return this.http.put(`${this.appRoot}/api/users/` + user.id, user).pipe(
      map((user: UserI) => {
        console.log('updateone user', user);
        return user;
      })
    );
  }

  findAll(page: number, size: number): Observable<UserData> {
    const url = `${this.appRoot}/api/users/pages?`;

    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http.get(url, { params }).pipe(
      map((userData: any) => {
        return userData;
      }),
      catchError((err) => throwError(err))
    );
  }

  uploadProfileImage(formData: FormData): Observable<any> {
      return this.http.post<FormData>(`${this.appRoot}/api/users/upload`, formData , {
      reportProgress: true,
      observe: 'events'
    });
  }

  paginateByName(
    page: number,
    size: number,
    search: string
  ): Observable<UserData> {
    const url = `${this.appRoot}/api/users/pages?`;
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));
    params = params.append('search', String(search));
    return this.http.get(url, { params }).pipe(
      map((userData: any) => {
        console.log('userdata', userData);
        return userData;
      }),
      catchError((err) => throwError(err))
    );
  }
}
