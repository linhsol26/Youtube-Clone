import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output("change-theme") theme = new EventEmitter();
  choices = [
    { name: "Profile", do: () => this.toProfile(), matIcon: "folder_shared" },
    { name: "Theme", do: () => this.changeTheme(), matIcon: "invert_colors" },
    {
      name: "Sign out",
      do: () => this.userGG.signOut(),
      matIcon: "keyboard_return"
    }
  ];
  constructor(public userGG: UserGoogleService) {}
  ngOnInit() {}

  toProfile() {}

  changeTheme() {
    this.theme.emit();
  }
}
