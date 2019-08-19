import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IVideo, IVideoForm } from "../interfaces/video";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(private _afs: AngularFirestore) {}

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

  updateVideoInfo(data: IVideoForm) {}
}
