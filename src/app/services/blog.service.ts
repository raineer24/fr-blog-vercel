import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { BlogEntry } from '../model/blog-entry.interface';

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