import { User } from "./user";
import { IVideoData } from "./video-form";

export interface IVideo {
  vid: string; // video id
  uid: string; // user id
  url: string;
  privacy: string;
  thumbnailURL: string;
  views: number;
  likes: number;
  dislikes: number;
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
    url: url,
    privacy: form.privacy,
    thumbnailURL: form.thumbnail,
    views: 0,
    likes: 0,
    dislikes: 0,
    title: form.title,
    description: form.description,
    tags: form.tags,
    timestamp: timestamp
  };
  return video;
}
