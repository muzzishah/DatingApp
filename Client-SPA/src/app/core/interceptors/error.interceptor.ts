import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  modalStateErrors.push(error.error.errors[key]);
                }
                throw modalStateErrors.flat();
              } else {
                this._toastr.error(error.statusText, error.status);
              }
              break;
            case 401:
              this._toastr.error(error.error);
              break;
            case 404:
              this._router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this._router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this._toastr.error('Something unexpected happened');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
