import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  files: any[];

  constructor(private _db: DatabaseService) {
    this.files = [];
  }

  ngOnInit() {}

  startUploading(files: File[]) {
    this.files = files;
  }
}
