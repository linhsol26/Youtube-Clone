import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  choices: any;

  constructor(public user: UserService) {
    this.choices = [
      { name: "Profile", do: this.toProFile, matIcon: "folder_shared" },
      { name: "Theme", do: this.changeTheme, matIcon: "invert_colors" },
      { name: "Sign out", do: this.user.signOut, matIcon: "keyboard_return" }
    ];
  }

  ngOnInit() {}

  toProFile() {
    console.log(this.user);
  }

  changeTheme() {}
}
