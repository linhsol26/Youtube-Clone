import { Component, ViewChild, Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent {
  @ViewChild("sidenav", { static: false }) sidenav: MatSidenav;

  menus = [
    { name: "Home", matIcon: "home", url: "/" },
    { name: "Upload", matIcon: "cloud_upload", url: "/upload" },
    { name: "Setting", matIcon: "settings", url: "/" },
    { name: "Help", matIcon: "help_outline", url: "/" }
  ];

  @Input("active") activeMenu: string = "Home";

  constructor() {}

  close() {
    this.sidenav.close();
  }
}
