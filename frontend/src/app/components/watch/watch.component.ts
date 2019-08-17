import { Component,OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})


 

export class WatchComponent implements OnInit {

  @Input() linkvideo;
  constructor() {


   }
   
  ngOnInit() {
  }

}
