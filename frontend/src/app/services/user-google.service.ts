import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { DatabaseService } from './database.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserGoogleService {
  user: User;
  // tslint:disable-next-line:variable-name
  private _userGG: any;
  logged = false;

  constructor(
    // tslint:disable-next-line:variable-name
    private _afAuth: AngularFireAuth,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _db: DatabaseService,
    // tslint:disable-next-line:variable-name
    private _theme: ThemeService
  ) {
    this._afAuth.user.subscribe(usr => {
      if (usr != null) {
        this._userGG = usr;
        this.logged = true;
        this.setUser();
      } else { this.logged = false; }
    });
  }

  async loginGoogle() {
    await this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this._userGG = this._afAuth.auth.currentUser;
    console.log(this._userGG.likes);
    this.setUser();
  }

  private setUser() {
    this.user = {
      uid: this._userGG.uid,
      type: 'google',
      lastTime: Date.now(),
      name: this._userGG.displayName,
      email: this._userGG.email,
      avatarURL: this._userGG.photoURL,
      videos: [],
      likes: [],
      dislikes: []
    };
    this._db.checkUser(this.user);
  }

  signOut() {
    this._afAuth.auth.signOut().then(() => {
      this.user = null;
      this._userGG = null;
      this._router.navigate(['/']);
      this._theme.dark = false;
    });
  }
}
