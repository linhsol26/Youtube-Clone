import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { UserGoogleService } from "src/app/services/user-google.service";
import { IVideoData } from "src/app/interfaces/video-form";
import { AngularFireUploadTask } from "@angular/fire/storage";

import { ImageFile } from "src/app/interfaces/image-file";
import { fadeAnimation } from "src/app/animations";
import { DatabaseService } from "src/app/services/database.service";
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
  fadeOut = false;
  finished = false; // when the user press the update button
  thumbGen = false;
  timestamp: number;

  // form
  @Input() videoData: IVideoData;
  formValid = true;

  progress: number;
  task: AngularFireUploadTask;

  constructor(
    private _userGG: UserGoogleService,
    private _db: DatabaseService
  ) {
    this.timestamp = Date.now();
  }

  ngOnInit() {
    this.videoData = {
      vid: this._userGG.user.uid + "-" + this.timestamp,
      title: "A video of " + this._userGG.user.name,
      privacy: "private",
      tags: ["amazing"],
      description: "",
      thumbnailURL: ""
    };

    this.upload(this.file);
  }

  upload(file: File) {
    const data = this._db.uploadVideo(this.videoData.vid, file, (url: string) =>
      this.setBasicInfo(url)
    );
    this.task = data.task;

    data.percentage.subscribe(async val => {
      this.progress = val;
      if (val == 100) {
        this.uploaded = true;
        this.imageFile.oldImgURL = await this._db.getThumbnailURL(
          this.videoData.vid
        );
        this.thumbGen = true;
      }
    });
  }

  setBasicInfo(url: string) {
    const info = getVideoTemplate(
      this.videoData,
      this._userGG.user,
      Date.now(),
      url
    );
    this._db.setBasicVideoInfo(info);
    this._db.addVideoToUser(this._userGG.user.uid, this.videoData.vid);
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
    this.task.cancel();
    this.deleteMe();
  }

  private deleteMe() {
    this.fadeOut = true;
    setTimeout(() => {
      this.deleteEvent.emit(true);
    }, 500);
  }

  // update button
  changeValid(valid: boolean) {
    this.formValid = valid;
  }

  async update() {
    this.finished = true;
    if (this.imageFile.newImage) {
      this.videoData.thumbnailURL = await this._db.uploadThumbnail(
        this.videoData.vid,
        this.imageFile.newImage
      );
    } else {
      this.videoData.thumbnailURL = this.imageFile.oldImgURL;
    }

    this._db.updateVideoInfo(this.videoData.vid, this.videoData).then(() => {
      this.deleteMe();
    });
  }
}
