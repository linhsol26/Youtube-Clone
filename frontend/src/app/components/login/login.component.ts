import { Component, OnInit } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  choices = [
    { name: "Profile", do: () => this.toProfile(), matIcon: "folder_shared" },
    { name: "Theme", do: () => this.changeTheme(), matIcon: "invert_colors" },
    {
      name: "Sign out",
      do: () => this.user.signOut(),
      matIcon: "keyboard_return"
    }
  ];

  constructor(public user: UserGoogleService) {}
  ngOnInit() {}

  toProfile() {}

  changeTheme() {}
}
