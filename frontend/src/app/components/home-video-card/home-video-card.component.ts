import { Component, OnInit, Input } from '@angular/core';
import { IVideoCard } from 'src/app/interfaces/video-card';

@Component({
  selector: 'app-home-video-card',
  templateUrl: './home-video-card.component.html',
  styleUrls: ['./home-video-card.component.scss']
})
export class HomeVideoCardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('video-card') card: IVideoCard;

  constructor() {}

  ngOnInit() {}
}
