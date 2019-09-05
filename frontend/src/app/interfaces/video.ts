import { User } from "./user";
import { IVideoData } from "./video-form";

export interface IVideo {
  vid: string; // video id
  uid: string; // user id
  cid: string[];
  url: string;
  privacy: string;
  thumbnailURL: string;
  views: number;
  likes: string[];
  dislikes: string[];
  title: string;
  description: string;
  tags: string[];
  timestamp: number;
}

export function getVideoTemplate(
  form: IVideoData,
  user: User,
  timestamp: number,
  url: string
) {
  const video: IVideo = {
    vid: form.vid,
    uid: user.uid,
    cid: [],
    url: url,
    privacy: form.privacy,
    thumbnailURL: form.thumbnailURL,
    views: 0,
    likes: [],
    dislikes: [],
    title: form.title,
    description: form.description,
    tags: form.tags,
    timestamp: timestamp
  };
  return video;
}
