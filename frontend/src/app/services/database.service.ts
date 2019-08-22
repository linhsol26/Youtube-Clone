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

import { finalize } from "rxjs/operators";
import { IVideo } from "../interfaces/video";
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

  setBasicVideoInfo(video: IVideo) {
    return this._afs
      .collection("videos")
      .doc(video.vid)
      .set(video);
  }

  // storage
  uploadVideo(file: File, user: User, doWhenUploaded: Function) {
    const vid: string = user.uid + "-" + Date.now();

    const ref: AngularFireStorageReference = this._storage.ref(
      "/videos/" + vid
    );
    const task: AngularFireUploadTask = ref.put(file);

    const percentage = task.percentageChanges();

    //get url
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => doWhenUploaded(url));
        })
      )
      .subscribe();

    return { task, vid, percentage };
  }

  // thumbnails
  getThumbnailURL(vid: string) {
    const genThumb = this._afn.httpsCallable("genThumb");
    return genThumb({ vid: vid }).toPromise();
  }
}
