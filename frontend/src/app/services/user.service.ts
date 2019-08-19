import { Injectable } from "@angular/core";

export interface User {
  uid: string;
  type: string;
  lastTime: string;
  name: string;
  email: string;
  avatarURL: string;
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: User;
  constructor() {}

  signUp() {}

  signIn() {}

  signOut() {}
}
