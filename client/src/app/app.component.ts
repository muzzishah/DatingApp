import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { StaticAPI } from "./shared/apiendpoints";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "The Dating App";

  users: any;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._http.get(StaticAPI.getUsers.url).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
