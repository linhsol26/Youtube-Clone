import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _user: any;
  logged = false;

  get name() {
    return this._user.displayName;
  }
  get email() {
    return this._user.email;
  }
  get avatar() {
    return this._user.photoURL;
  }

  constructor(private _afAuth: AngularFireAuth, private _router: Router) {
    this._afAuth.user.subscribe(user => {
      if (user != null) {
        this._user = user;
        this.logged = true;
      } else this.logged = false;
    });
  }

  async loginGoogle() {
    await this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this._user = this._afAuth.auth.currentUser;
  }

  signOut() {
    this._afAuth.auth.signOut().then(() => {
      this._router.navigate(["/"]);
    });
  }
}
