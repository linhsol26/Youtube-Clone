import { Injectable } from "@angular/core";
import { WatchVideoComponent } from "../components/watch-video/watch-video.component";

@Injectable({
  providedIn: "root"
})
export class MiniPlayerService {
  video: WatchVideoComponent;
  constructor() {}
}
