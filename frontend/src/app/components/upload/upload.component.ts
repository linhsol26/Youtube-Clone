import { Component, OnInit } from "@angular/core";
import { getVideoTemplate } from "src/app/interfaces/video";
import { UserService } from "src/app/services/user.service";
import { UserGoogleService } from "src/app/services/user-google.service";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  files: any[];

  constructor(private _userGG: UserGoogleService, private db: DatabaseService) {
    this.files = [];
  }

  ngOnInit() {}

  startUploading(files) {
    this.files = files;
  }
}
