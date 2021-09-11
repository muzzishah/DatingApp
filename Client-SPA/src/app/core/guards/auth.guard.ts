import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _toastr: ToastrService,
    private _sessionService: SessionService
  ) {}
  canActivate(): Observable<boolean> {
    return this._sessionService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          this._toastr.error('You shall not pass!');
          return false;
        }
      })
    );
  }
}
