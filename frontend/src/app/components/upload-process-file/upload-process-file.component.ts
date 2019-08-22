import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";
import { IVideoData } from "src/app/interfaces/video-form";
import { AngularFireUploadTask } from "@angular/fire/storage";

import { ImageFile } from "src/app/interfaces/image-file";
import { fadeAnimation } from "src/app/animations";
import { DatabaseService } from "src/app/services/database.service";
import { User } from "src/app/interfaces/user";
import { getVideoTemplate } from "src/app/interfaces/video";

@Component({
  selector: "app-upload-process-file",
  templateUrl: "./upload-process-file.component.html",
  styleUrls: ["./upload-process-file.component.scss"],
  animations: [fadeAnimation]
})
export class UploadProcessFileComponent implements OnInit {
  @Input() file: File;
  @Output("delete-me") deleteEvent = new EventEmitter();

  imageFile: ImageFile = {
    oldImgURL: "",
    newImage: null
  };

  uploaded = false;
  paused = false;
  canceled = false;
  finished = false;
  vid: string;

  // form
  @Input() videoData: IVideoData;
  formValid = true;

  progress: number;
  task: AngularFireUploadTask;

  constructor(
    private _userGG: UserGoogleService,
    private _db: DatabaseService
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

    this.upload(this.file, this._userGG.user);
  }

  upload(file: File, user: User) {
    const data = this._db.uploadVideo(file, user, (url: string) =>
      this.setBasicInfo(url)
    );
    this.task = data.task;
    this.vid = data.vid;

    data.percentage.subscribe(async val => {
      this.progress = val;
      if (val == 100) {
        this.uploaded = true;
        this.imageFile.oldImgURL = await this._db.getThumbnailURL(this.vid);
      }
    });
  }

  setBasicInfo(url: string) {
    const info = getVideoTemplate(this._userGG.user, url);
    this._db.setBasicVideoInfo(info);
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
    this.deleteMe();
  }

  private deleteMe() {
    setTimeout(() => {
      this.deleteEvent.emit(true);
    }, 500);
  }

  // update button
  changeValid(valid: boolean) {
    this.formValid = valid;
  }

  update() {
    // update database

    this.finished = true;
    // this.deleteMe();
  }
}
