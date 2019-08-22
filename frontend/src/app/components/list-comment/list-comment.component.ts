import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  @Input() comment;
  comment_content;

  constructor(private firestore: AngularFirestore) {

  }
  data_have = false;
  ngOnInit() {
    
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.comment);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(typeof(this.comment));
    // console.log(this.comment);
    for (let i = 0; i < this.comment.length; i++) {
      this.firestore.collection('comments').doc(this.comment[i]).snapshotChanges()
        .subscribe(data => {
          this.data_have =true;
          this.comment_content = data.payload.data();
          console.log(this.comment_content);
        })
      
    }
  }

}

