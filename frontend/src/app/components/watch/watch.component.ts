import { Component, OnInit, Input, } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
// import { ReportComponent } from '../report/report.component';
// import { MatDialog } from '@angular/material/dialog';
import { VideoUrlService } from '../../services/video-url.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})

export class WatchComponent implements OnInit {

  videomain: HTMLVideoElement;
  vid: any;
  arrvd: any;
  constructor(private VideoUrlService: VideoUrlService, public user: UserService, private route: ActivatedRoute) {
    this.vid = this.route.snapshot.params['vid'];
  }

  // firebasestorage.googleapis.com/v0/b/fir-demo-5413c.appspot.com/o/test%2Ftest-video.mp4?alt=media&token=14fe757e-f76b-4a5c-ab86-ebaf8f06252c

  //info
  src = "https://firebasestorage.googleapis.com/v0/b/fir-demo-5413c.appspot.com/o/test%2Ftest-video.mp4?alt=media&token=14fe757e-f76b-4a5c-ab86-ebaf8f06252c";
  view_total = '100.000';
  owner_video_name = 'Nguyen Vo Dang Cao';
  like_count = '100';
  dislike_count = '20';
  description = "Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata.vIronman and his team in infinity war These docs assume that you are already familiar with HTML, CSS, JavaScript, and some of the tools from the latest standards, such as classes and modules. The code samples are written using TypeScript. Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata.Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata.vIronman and his team in infinity war These docs assume that you are already familiar with HTML, CSS, JavaScript, and some of the tools from the latest standards, such as classes and modules. The code samples are written using TypeScript. Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata."
  total_comment = "1090";
  button_disable = true;

  //report
  //   name : string;
  //   email: string;
  //   rpcontent: string;
  //   openReport(){
  //   const dialogReport = this.dialog.open(ReportComponent,{
  //     width: '260px',
  //     data : {name : this.name, email : this.email, rpcontent : this.rpcontent }
  //   });
  //   dialogReport.afterClosed().subscribe(result => {
  //     console.log('closed');
  //   })
  // }
  //viewmore
  off_viewmore = true;
  title_view = 'View more';
  viewmore() {
    if (this.off_viewmore) {
      this.title_view = "Compact";
      this.off_viewmore = false;
    } else {
      this.title_view = 'View more';
      this.off_viewmore = true;
    }
  }
  //button
  availablebutton() {
    this.button_disable = false;
  }
  availablebutton_focusout() {
    if (this.comment == "") this.button_disable = true;
    else this.availablebutton();
  }
  Cancel() {
    this.comment = "";
    this.button_disable = true;
  }

  Accept() {
    //dosomething
    console.log(window.location.search);
    this.comment = "";
    this.button_disable = true;
  }
  //input
  comment: string = "";

  videos : any;

  ngOnInit() {
    this.VideoUrlService.getVideos().subscribe(videos => {
      console.log(videos);
      this.videos = videos;
      console.log(this.videos.url);
      this.src = this.videos[0]['url'];
    })
  }

}
