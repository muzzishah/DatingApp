import { Component, OnInit } from "@angular/core";
import { HttpService } from "../core/services/http.service";
import { StaticAPI } from "../shared/apiEndPoints";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: { username: string; password: string } = {
    username: "dave",
    password: "Pa$$word",
  };

  isLoggedIn: boolean = false;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {}

  login() {
    this._httpService.POST_DATA(StaticAPI.login.url, this.model).subscribe(
      (res) => {
        console.log(res);
        this.isLoggedIn = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
