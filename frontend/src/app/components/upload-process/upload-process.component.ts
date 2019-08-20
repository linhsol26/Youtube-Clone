import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-upload-process",
  templateUrl: "./upload-process.component.html",
  styleUrls: ["./upload-process.component.scss"]
})
export class UploadProcessComponent implements OnInit {
  @Input() files: File[];

  constructor() {}

  ngOnInit() {}

  delete(index) {
    this.files.splice(index, 1);
  }
}
