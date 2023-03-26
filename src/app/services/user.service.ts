import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserI } from '../model/user.interface';
import { environment } from '../../environments/environment';

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

  findAll(page: number, size: number): Observable<UserData> {
    console.log('approot', `${this.appRoot}/api/users/pages?`);
    const url = `${this.appRoot}/api/users/pages?`;
    console.log('url', url);
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http.get(url, { params }).pipe(
      map((userData: any) => {
        console.log('userdata', userData);
        return userData;
      }),
      catchError((err) => throwError(err))
    );
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
