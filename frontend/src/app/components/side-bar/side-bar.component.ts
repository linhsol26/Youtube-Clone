import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit {
  @ViewChild("sidenav", { static: false }) sidenav: MatSidenav;

  constructor() {}

  ngOnInit() {}

  close() {
    this.sidenav.close();
  }
}
