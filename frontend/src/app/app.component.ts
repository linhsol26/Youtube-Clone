import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private router: Router) {}

  getRoute() {
    if (this.router.url == "/") return "Home";
    if (this.router.url == "/upload") return "Upload";
  }
}
