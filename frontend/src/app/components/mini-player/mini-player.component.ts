import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { WatchVideoComponent } from "../watch-video/watch-video.component";
import { MiniPlayerService } from "src/app/services/mini-player.service";

@Component({
  selector: "app-mini-player",
  templateUrl: "./mini-player.component.html",
  styleUrls: ["./mini-player.component.scss"]
})
export class MiniPlayerComponent implements OnInit, AfterViewInit {
  @Input() video: WatchVideoComponent;

  constructor(private _player: MiniPlayerService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log(this.video);
    this._player.video = this.video;
  }
}
