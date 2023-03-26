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
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    return this.http
      .get<UserData>(`${this.appRoot}/api/users/pages?`, { params })
      .pipe(
        map((userData: UserData) => userData),
        catchError((err) => throwError(err))
      );
  }
}
