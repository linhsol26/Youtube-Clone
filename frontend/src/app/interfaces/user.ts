export interface User {
  uid: string;
  type: string;
  lastTime: number;
  name: string;
  email: string;
  avatarURL: string;
  videos: string[];
  likes : string[];
  dislikes: string[];
}
