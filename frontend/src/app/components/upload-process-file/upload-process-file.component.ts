import { Component, OnInit, Input } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";
import { IVideoData } from "src/app/interfaces/video-form";
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-upload-process-file",
  templateUrl: "./upload-process-file.component.html",
  styleUrls: ["./upload-process-file.component.scss"]
})
export class UploadProcessFileComponent implements OnInit {
  @Input() file: File;
  uploaded = false;
  paused = false;

  // form
  videoData: IVideoData;
  formValid = true;

  progress: Observable<number>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url: Observable<string>;

  constructor(
    private _userGG: UserGoogleService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    // add an observable here to listen to the user value
    this.videoData = {
      uid: this._userGG.user.uid,
      title: "A video of " + this._userGG.user.name,
      privacy: "private",
      tags: ["amazing"],
      description: "",
      thumbnail: []
    };

    this.upload(this.file);
  }

  upload(file: File) {
    const vid = this.videoData.uid + "-" + Date.now();

    // create a reference
    this.ref = this.storage.ref("/videos/" + vid);
    // upload
    this.task = this.ref.put(file);
    // this.task = this.storage.upload(path, file);
    // update the progress
    this.progress = this.task.percentageChanges();
    // get url
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.uploaded = true;
          this.url = this.ref.getDownloadURL();
        })
      )
      .subscribe();
  }

  // pause continue buttons
  interact() {
    if (this.paused) this.continue();
    else this.pause();
  }

  pause() {
    this.paused = true;
  }

  continue() {
    this.paused = false;
  }

  //cancel button
  cancel() {}

  // save button
  changeValid(valid: boolean) {
    console.log(valid);
    this.formValid = valid;
  }
}
