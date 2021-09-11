import { Component, OnInit } from '@angular/core';
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

  currentUser: string = '';

  constructor(
    private _httpService: HttpService,
    public _sessionService: SessionService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

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
      .subscribe();
  }

  logout() {
    this._sessionService.removeCurrentUserFromStorage();
  }

  getCurrentUser() {
    this._sessionService.currentUser$.subscribe((res) => {
      if (res) {
        this.currentUser = res.username;
      }
    });
  }
}
