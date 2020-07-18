import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  constructor() {}

  signUp() {}

  signIn() {}

  signOut() {}
}
