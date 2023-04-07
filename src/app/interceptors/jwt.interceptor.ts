import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('interceptor');
    const token = localStorage.getItem(JWT_NAME);

    if (token) {
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      console.log('cloneReq', cloneReq);
      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }
  }
}
