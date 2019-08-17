import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: any;
  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe(user => {
      if (user != null) {
      }
    });
  }

  async loginGoogle() {
    const provider = new auth.GoogleAuthProvider();
    await this.auth.auth.signInWithPopup(provider);
    this.user = this.auth.auth.currentUser;
  }

  getUserInfo() {}
}
