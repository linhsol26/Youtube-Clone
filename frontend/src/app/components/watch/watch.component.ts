import { Component,OnInit, Input, ViewChild } from '@angular/core';
import { MatVideoComponent } from 'mat-video/app/video/video.component';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})


 

export class WatchComponent implements OnInit {
  
  @ViewChild('videomain',{static:false}) matVideo : MatVideoComponent;
  @Input() linkvideo;

  
  videomain: HTMLVideoElement;
  constructor() {


   }
  
  
  ngOnInit() {
    this.videomain = this.matVideo.getVideoTag();
    this.videomain.src = "video.mp4";
  }

}
