import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from '../core/services/http.service';
import { SessionService } from '../core/services/session.service';
import { StaticAPI } from '../shared/apiEndPoints';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancleRegister = new EventEmitter();

  model: any = {};

  constructor(
    private _httpService: HttpService,
    public _sessionService: SessionService
  ) {}

  ngOnInit(): void {}

  register() {
    this._httpService
      .POST_DATA(StaticAPI.registerUser.url, this.model)
      .pipe(
        map((user: any) => {
          if (user) {
            this._sessionService.setCurrentUserFromToken(user);
          }
          return user;
        })
      )
      .subscribe(
        (res) => {
          this.cancel();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  cancel() {
    this.cancleRegister.emit(false);
  }
}
