import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { IVideo, IVideoForm } from "../interfaces/video";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(
    private _afs: AngularFirestore,
    private _storage: AngularFireStorage,
    private _afn: AngularFireFunctions
  ) {}

  checkUser(user: User): boolean {
    const userRef: AngularFirestoreDocument<any> = this._afs
      .collection("users")
      .doc(user.uid);
    userRef.get().subscribe(snap => {
      if (snap.exists) {
        userRef.update({ lastTime: user.lastTime });
        return true;
      } else {
        userRef.set(user);
      }
    });
    return false;
  }

  async setVideoInfo(video: IVideo) {
    await this._afs
      .collection("videos")
      .doc(video.vid)
      .set(video);
  }

  // storage
  uploadVideo(file: File, uid: string) {
    const vid: string = uid + "-" + Date.now();

    const ref: AngularFireStorageReference = this._storage.ref(
      "/videos/" + vid
    );
    const task: AngularFireUploadTask = ref.put(file);

    // get url
    // this.task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.uploaded = true;
    //       this.url = this.ref.getDownloadURL();
    //     })
    //   )
    //   .subscribe();

    return { vid, task };
  }

  // thumbnails
  async getThumbnailURL(vid: string) {
    const genThumb = this._afn.httpsCallable("genThumb");
    return await genThumb({ vid: vid }).toPromise();
  }

  updateVideoInfo(data: IVideoForm) {}
}
