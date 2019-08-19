import { Component, OnInit } from "@angular/core";
import { Video } from "src/app/interfaces/video";
import { UserService } from "src/app/services/user.service";
import { UserGoogleService } from "src/app/services/user-google.service";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  videos: any[];
  constructor(
    private _userGG: UserGoogleService,
    private db: DatabaseService
  ) {}

  ngOnInit() {}

  upload() {
    let v = new Video(this._userGG.user, "abc.com");
    console.log(v);

    this.db.setVideoInfo(v);
  }
}
