import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Button } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogged: boolean;

  constructor(
    // tslint:disable-next-line:variable-name
    private _afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  // tslint:disable-next-line:max-line-length
  canActivate(): Observable<boolean> {
    return this._afAuth.authState.pipe(
      map<firebase.User, boolean>((user) => {
        if (user) {
          return true;
        }
        this.snackBar.open('You need to sign in to watch videos!', 'OK', {duration: 2000});
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
