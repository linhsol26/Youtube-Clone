import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";
import { IVideoData } from "src/app/interfaces/video-form";
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { ImageFile } from "src/app/interfaces/image-file";
import { fadeAnimation } from "src/app/animations";

@Component({
  selector: "app-upload-process-file",
  templateUrl: "./upload-process-file.component.html",
  styleUrls: ["./upload-process-file.component.scss"],
  animations: [fadeAnimation]
})
export class UploadProcessFileComponent implements OnInit {
  @Input() file: File;
  @Output("delete-me") deleteEvent = new EventEmitter();

  fileImage: ImageFile = {
    oldImgURL: "../../../assets/cat.jpg",
    newImage: null
  };

  uploaded = false;
  paused = false;
  canceled = false;
  vid: string;

  // form
  @Input() videoData: IVideoData;
  formValid = true;

  progress: Observable<number>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url: Observable<string>;

  constructor(
    private _userGG: UserGoogleService,
    private _storage: AngularFireStorage
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
    this.vid = this.videoData.uid + "-" + Date.now();

    // create a reference
    this.ref = this._storage.ref("/videos/" + this.vid);
    // upload
    this.task = this.ref.put(file);
    // this.task = this.storage.upload(path, file);
    // update the progress
    this.progress = this.task.percentageChanges();
    // this.progress.subscribe(val => console.log(val));
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

  // pause resume buttons
  interact() {
    if (this.paused) this.resume();
    else this.pause();
  }

  pause() {
    this.paused = true;
    this.task.pause();
  }

  resume() {
    this.paused = false;
    this.task.resume();
  }

  //cancel button
  cancel() {
    this.canceled = true;
    this.task.cancel();

    setTimeout(() => {
      this.deleteEvent.emit(true);
    }, 500);
  }

  // update button
  changeValid(valid: boolean) {
    this.formValid = valid;
  }
}
