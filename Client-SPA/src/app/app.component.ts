import { Component, OnInit } from "@angular/core";
import { HttpService } from "./core/services/http.service";
import { StaticAPI } from "./shared/apiEndPoints";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "The Dating App";

  users: any;

  constructor(private _httpService: HttpService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._httpService.GET_DATA(StaticAPI.getUsers.url).subscribe(
      (res) => {
        this.users = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
}
