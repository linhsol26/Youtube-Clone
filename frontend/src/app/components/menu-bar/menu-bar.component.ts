import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.scss"]
})
export class MenuBarComponent {
  @Input() route: string;
  @Output("show-side-bar") showSideNav = new EventEmitter();

  constructor() {}

  showSideBar() {
    this.showSideNav.emit();
  }
}
