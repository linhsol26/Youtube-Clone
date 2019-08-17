import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  menus: [{ name: "Profile"; do: 1 }];

  constructor(public user: UserService) {}

  ngOnInit() {}

  isGuest() {
    return true;
  }

  toProFile = () => {};
}
