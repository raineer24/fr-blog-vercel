import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { BlogEntriesPageable, BlogEntry } from '../model/blog-entry.interface';

export interface BlogData {
  results: BlogEntry[];
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
export class BlogService {
  appRoot = environment.appRoot;
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<BlogEntry> {
    const url = `${this.appRoot}/api/blogs/`;
    return this.http.get<BlogEntry>(url + id);
  }

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();
    console.log('paramms', params);
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http
      .get<BlogEntriesPageable>(`${this.appRoot}/api/blogs/pages?`, { params })
      .pipe(
        map((userData: any) => {
          console.log('userdata', userData);
          return userData;
        }),
        catchError((err) => throwError(err))
      );
  }

  findAll(page: number, size: number): Observable<BlogEntry> {
    const url = `${this.appRoot}/api/blogs/pages?`;

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




  indexByUser(
    userId: number,
    page: number,
    limit: number
  ): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>(
      '/api/blog-entries/user/' + String(userId),
      { params }
    );
  }
}
