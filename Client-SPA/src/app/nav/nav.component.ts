import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../core/services/http.service';
import { SessionService } from '../core/services/session.service';
import { StaticAPI } from '../shared/apiEndPoints';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: { username: string; password: string } = {
    username: '',
    password: '',
  };

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _toastr: ToastrService,
    public _sessionService: SessionService
  ) {}

  ngOnInit() {}

  login() {
    this._httpService
      .POST_DATA(StaticAPI.login.url, this.model)
      .pipe(
        map((user: any) => {
          if (user) {
            this._sessionService.setCurrentUserFromToken(user);
          }
        })
      )
      .subscribe(
        (res) => {
          this._router.navigateByUrl('/members');
        },
        (err) => {
          console.log(err);
          this._toastr.error(err.error);
        }
      );
  }

  logout() {
    this._sessionService.removeCurrentUserFromStorage();
    this._router.navigateByUrl('/');
  }
}
