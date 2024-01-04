import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { BlogEntriesPageable, BlogEntry } from '../model/blog-entry.interface';

export interface UserData {
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
    providedIn: 'root'
  })
  export class BlogService {
    appRoot = environment.appRoot;
    constructor(private http: HttpClient) { }

    findOne(id: number): Observable<BlogEntry> {
      const url = `${this.appRoot}/api/blogs/`;
      return this.http.get<BlogEntry>(url + id);
    }
  
    indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
      let params = new HttpParams();
  
      params = params.append('page', String(page));
      params = params.append('limit', String(limit));
  
      return this.http.get<BlogEntriesPageable>('/api/blogs/pages?', {params});
    }
  
    indexByUser(userId: number, page: number, limit: number): Observable<BlogEntriesPageable> {
      let params = new HttpParams();
  
      params = params.append('page', String(page));
      params = params.append('limit', String(limit));
  
      return this.http.get<BlogEntriesPageable>('/api/blog-entries/user/' + String(userId), {params});
    }
  
  }