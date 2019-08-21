import { Component, OnInit } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";
import { DatabaseService } from "src/app/services/database.service";
import { IVideo } from "src/app/interfaces/video";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  files: any[];
  video: any;

  constructor(private _db: DatabaseService) {
    this.files = [];
  }

  ngOnInit() {}

  startUploading(files: File[]) {
    this.files = files;
  }
}
