import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-upload-input",
  templateUrl: "./upload-input.component.html",
  styleUrls: ["./upload-input.component.scss"]
})
export class UploadInputComponent implements OnInit {
  files: any = [];
  fileTypes = ["video/mp4"];

  @Output("start-uploading") uploadEvent = new EventEmitter();

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  getFiles(files: any) {
    for (let file of files) {
      if (this.fileTypes.includes(file.type)) {
        this.files.push(file.name);
      } else {
        this.openSnackBar("Invalid files!", "Close");
        this.files = [];
        break;
      }
    }
  }
  deleteFile(index: number) {
    this.files.splice(index, 1);
    console.log(this.files);
  }

  startUploading() {
    this.uploadEvent.emit(this.files);
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
