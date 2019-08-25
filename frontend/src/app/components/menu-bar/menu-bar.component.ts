import { Component, Output, EventEmitter, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserGoogleService } from "src/app/services/user-google.service";
import { Router } from "@angular/router";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.scss"]
})
export class MenuBarComponent {
  @Input() route: string;
  @Output("show-side-bar") showSideNav = new EventEmitter();

  constructor(
    private _snackBar: MatSnackBar,
    private _userGG: UserGoogleService,
    private _router: Router,
    public theme: ThemeService
  ) {}

  showSideBar() {
    this.showSideNav.emit();
  }

  toUpload() {
    if (!this._userGG.user) {
      this.openSnackBar("You need to sign in to upload videos!", "OK");
    } else {
      this._router.navigate(["/upload"]);
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
