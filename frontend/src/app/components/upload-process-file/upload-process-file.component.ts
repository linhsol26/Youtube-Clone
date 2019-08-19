import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-upload-process-file",
  templateUrl: "./upload-process-file.component.html",
  styleUrls: ["./upload-process-file.component.scss"]
})
export class UploadProcessFileComponent implements OnInit {
  @Input() file: any;
  uploaded = false;
  progress: number = 0;

  constructor() {
    this.progress = 40;
  }

  ngOnInit() {}
}
