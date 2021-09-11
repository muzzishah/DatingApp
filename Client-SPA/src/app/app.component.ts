import { Component, OnInit } from '@angular/core';
import { HttpService } from './core/services/http.service';
import { SessionService } from './core/services/session.service';
import { StaticAPI } from './shared/apiEndPoints';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'The Dating App';

  constructor(private _sessionService: SessionService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this._sessionService.setCurrentUserFromStorage();
  }
}
