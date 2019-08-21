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
import { get } from "http";

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
  uploadVideo(file: File, user: User) {
    const vid: string = user.uid + "-" + Date.now();
    const ref: AngularFireStorageReference = this._storage.ref(
      "/videos/" + vid
    );
    const task: AngularFireUploadTask = ref.put(file);
    // this.getVideoURL(ref, task).then(val => console.log(val));

    return { vid, task };
  }

  getVideoURL(ref: AngularFireStorageReference, task: AngularFireUploadTask) {
    let url: Promise<any>;
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          url = await ref.getDownloadURL().toPromise();
        })
      )
      .subscribe();

    return url;
  }

  // thumbnails
  async getThumbnailURL(vid: string) {
    const genThumb = this._afn.httpsCallable("genThumb");
    return await genThumb({ vid: vid }).toPromise();
  }

  updateVideoInfo(data: IVideoForm) {}
}
