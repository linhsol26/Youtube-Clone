import { Component, OnInit } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";
import { ThemeService } from "src/app/services/theme.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  darkTheme: string = "Off";

  choices = [
    { name: "Profile", do: () => this.toProfile(), matIcon: "folder_shared" },
    {
      name: "Dark theme",
      do: () => this.changeTheme(),
      matIcon: "invert_colors"
    },
    {
      name: "Sign out",
      do: () => this.userGG.signOut(),
      matIcon: "keyboard_return"
    }
  ];
  constructor(
    public userGG: UserGoogleService,
    private _theme: ThemeService,
    private _router: Router
  ) {}
  ngOnInit() {}

  toProfile() {
    this._router.navigate(["/profile"]);
  }

  changeTheme() {
    this._theme.dark = !this._theme.dark;
    this.darkTheme = this._theme.dark ? "On" : "Off";
  }
}
