import { User } from "./user";

export interface IVideo {
  vid: string; // video id
  uid: string; // user id
  cid: string; // comment id
  url: string;
  cat: string;
  thumbnailURL: string;
  views: number;
  likes: number;
  dislikes: number;
  title: string;
  description: string;
  tags: string[];
  date: number;
}

export function getVideoTemplate(user: User, url: string) {
  let video: IVideo = {
    vid: user.uid + "-" + Date.now(),
    uid: user.uid,
    cid: "",
    url: url,
    cat: "private",
    thumbnailURL: "",
    views: 0,
    likes: 0,
    dislikes: 0,
    title: `A video of ${user.name}`,
    description: "",
    tags: [],
    date: Date.now()
  };
  return video;
}

// export class Video implements IVideo {
//   vid: string;
//   uid: string;
//   cid: string;
//   url: string;
//   cat: string = "private";
//   thumbnailURL: string;
//   views: number = 0;
//   likes: number = 0;
//   dislikes: number = 0;
//   title: string;
//   description: string;
//   tags: string[];
//   date: number;

//   constructor(user: User, url: string) {
//     this.date = Date.now();
//     this.vid = user.uid + this.date;
//     this.uid = user.uid;
//     this.url = url;
//     this.title = `A video of ${user.name}`;
//   }
// }
