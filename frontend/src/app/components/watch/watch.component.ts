import { Component, OnInit, Input, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ReportComponent } from '../report/report.component';
// import { MatDialog } from '@angular/material/dialog';
import { VideoUrlService } from '../../services/video-url.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserGoogleService } from 'src/app/services/user-google.service';
import { Comments } from 'src/app/interfaces/comments';
import { CommentsService } from 'src/app/services/comments.service';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})

export class WatchComponent implements OnInit {
  vid = 'M4YWrvD8D8W9m8idhTSO6rL7r2T2-1566194943916';
  comment_interface: Comments;
  comment_id;
  constructor(
    private firebase: AngularFirestore,
    //private VideoUrlService: VideoUrlService,
    public comment_service: CommentsService,
    public current_user: UserGoogleService,
    private route: ActivatedRoute,
  ) {
    //take vid from route url
    //this.vid = this.route.snapshot.params['vid'];  
    
    



  }

  //will be take info data get of firebase
  userinfo_owner: Object;
  //info user owner 
  owner_avatarURL;
  owner_name;

  //will be take info data get of firestore
  videoinfo: Object;

  //infovideo
  //src = "https://firebasestorage.googleapis.com/v0/b/fir-demo-5413c.appspot.com/o/test%2Ftest-video.mp4?alt=media&token=14fe757e-f76b-4a5c-ab86-ebaf8f06252c";
  src;
  view_total = '100.000';
  owner_video_name = 'Nguyen Vo Dang Cao';
  like_count = '100';
  dislike_count = '20';
  title = "";
  description = "Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata.vIronman and his team in infinity war These docs assume that you are already familiar with HTML, CSS, JavaScript, and some of the tools from the latest standards, such as classes and modules. The code samples are written using TypeScript. Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata.Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata.vIronman and his team in infinity war These docs assume that you are already familiar with HTML, CSS, JavaScript, and some of the tools from the latest standards, such as classes and modules. The code samples are written using TypeScript. Most Angular code can be written with just the latest JavaScript, using types for dependency injection, and using decorators for metadata."
  total_comment = "1090";
  button_disable = true;
  uid_owner = "";
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
    console.log(typeof(this.comment_id));
    if (this.off_viewmore) {
      this.title_view = "Compact";
      this.off_viewmore = false;
    } else {
      this.title_view = 'View more';
      this.off_viewmore = true;
    }
  }

  //input comment
  comment: string = "";

  //button accept and cancel
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

  addnewcomment() {
    this.comment_interface = {
      uid: this.current_user.user.uid,
      cid: this.current_user.user.uid + this.vid + Date.now(),
      vid: this.vid,
      content: this.comment,
      likes: 0,
      dislikes: 0,
      time: Date.now(),
    }
    this.comment_service.createComment(this.comment_interface);
  }
  Accept() {
    //dosomething
    this.addnewcomment();

    //console.log(window.location.search);
    this.comment = "";
    this.button_disable = true;
  }


  //videos : any;

  ngOnInit() {
    // this.VideoUrlService.getVideos().subscribe(videos => {
    //   console.log(videos);
    //   this.videos = videos;
    //   console.log(this.videos.url);
    //   this.src = this.videos[0]['url'];
    // })
    // this.firebase.doc(`videos/${this.vid}`).get()
    this.firebase.collection('videos').doc(this.vid).snapshotChanges()
      .subscribe(data => {
        
        this.videoinfo = data.payload.data();
        //console.log(this.videoinfo);
        this.src = this.videoinfo['url'];
        console.log(this.src);
        this.like_count = this.videoinfo['likes'];
        this.dislike_count = this.videoinfo['dislikes'];
        this.description = this.videoinfo['description'];
        this.title = this.videoinfo['title'];
        this.view_total = this.videoinfo['views'];
        this.comment_id = this.videoinfo['cid'];
        //console.log(typeof(data.data()['cid']));
        //after get uid going to do take 
        this.firebase.collection('users').doc(this.videoinfo['uid']).get()
          .toPromise()
          .then(data => {
            this.userinfo_owner = data.data();
            //console.log(this.userinfo_owner);
            this.owner_avatarURL = this.userinfo_owner['avatarURL'];
            this.owner_name = this.userinfo_owner['name'];
          })
      })
      
       //this.firebase.collection('videos', ref =>  ref.where('vid','==',this.vid)).snapshotChanges().subscribe(data => {
         // data.forEach(test => {
           // console.log(test);
            //this.comment_id = test.payload.doc.data().cid;
            //console.log(typeof(this.comment_id));
          //})
          //this.comment_id = data. ;
          //console.log(this.comment_id +"snapshotChanges");
        //});
  }

}
