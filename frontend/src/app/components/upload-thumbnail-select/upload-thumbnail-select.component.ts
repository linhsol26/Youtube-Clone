import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImageFile } from "src/app/interfaces/image-file";

@Component({
  selector: "app-upload-thumbnail-select",
  templateUrl: "./upload-thumbnail-select.component.html",
  styleUrls: ["./upload-thumbnail-select.component.scss"]
})
export class UploadThumbnailSelectComponent implements OnInit {
  @Input("image-file") data: ImageFile;

  fileTypes = ["image/png", "image/jpeg", "image/jpg"];
  imageURL: string;
  uploaded = false;
  choice: string = "1";
  newImage: File;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  getFile($event: any) {
    const file = $event.target.files[0];

    if (!this.fileTypes.includes(file.type)) {
      this.openSnackBar("Invalid image!", "OK");
    } else if (file.size > 2097152) {
      this.openSnackBar("Max 2MB image size!", "Close");
    } else {
      this.uploaded = true;
      this.newImage = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: Event) => {
        this.imageURL = event.target["result"];
      };

      this.choice = "2";
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  onSelect(choice) {
    if (choice == "1") this.data.newImage = null;
    if (choice == "2") this.data.newImage = this.newImage;
  }
}
