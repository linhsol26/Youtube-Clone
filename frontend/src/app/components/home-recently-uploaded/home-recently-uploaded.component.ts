import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-home-recently-uploaded",
  templateUrl: "./home-recently-uploaded.component.html",
  styleUrls: ["./home-recently-uploaded.component.scss"]
})
export class HomeRecentlyUploadedComponent implements OnInit {
  videoCards: any[];
  ready = false;

  constructor(private _db: DatabaseService) {}

  ngOnInit() {
    this._db.getPublicVideos().then(val => {
      this.videoCards = val.reverse();
      this.ready = true;
    });
  }
}
