import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loadingService.isloading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);

    this.loadingService.isloading.next(true);
    return Observable.create((observer: { next: (arg0: HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}