import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { Router } from "@angular/router";
import { User } from "./user.service";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root"
})
export class UserGoogleService {
  user: User;
  private _userGG: any;
  logged = false;

  get name() {
    return this._userGG.displayName;
  }
  get email() {
    return this._userGG.email;
  }
  get avatar() {
    return this._userGG.photoURL;
  }

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private db: DatabaseService
  ) {
    this._afAuth.user.subscribe(user => {
      if (user != null) {
        this._userGG = user;
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
      lastTime: new Date().toJSON()
    };
    this.db.checkUser(this.user);
  }

  signOut() {
    this._afAuth.auth.signOut().then(() => {
      this._router.navigate(["/"]);
    });
  }
}
