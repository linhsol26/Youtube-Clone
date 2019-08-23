import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { Router } from "@angular/router";
import { User } from "../interfaces/user";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root"
})
export class UserGoogleService {
  user: User;
  private _userGG: any;
  logged = false;

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private db: DatabaseService
  ) {
    this._afAuth.user.subscribe(usr => {
      if (usr != null) {
        this._userGG = usr;
        this.logged = true;
        this.setUser();
      } else this.logged = false;
    });
  }

  async loginGoogle() {
    await this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this._userGG = this._afAuth.auth.currentUser;

    this.setUser();
  }

  private setUser() {
    this.user = {
      uid: this._userGG.uid,
      type: "google",
      lastTime: Date.now(),
      name: this._userGG.displayName,
      email: this._userGG.email,
      avatarURL: this._userGG.photoURL,
      videos: []
    };
    this.db.checkUser(this.user);
  }

  signOut() {
    this._afAuth.auth.signOut().then(() => {
      this._router.navigate(["/"]);
    });
  }
}
