import { Injectable } from "@angular/core";
import { User } from "./user.service";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

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
}
