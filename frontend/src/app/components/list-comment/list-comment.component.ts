import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "src/app/interfaces/user";
import { Comments } from "src/app/interfaces/comments";
@Component({
  selector: "app-list-comment",
  templateUrl: "./list-comment.component.html",
  styleUrls: ["./list-comment.component.scss"]
})
export class ListCommentComponent implements OnInit {
  @Input() comment;
  current_comment: Comments;
  user_comment: User;
  constructor(private firestore: AngularFirestore) {

  }
  data_have = false;

  ngOnInit() {
    this.firestore
    .collection("comments")
    .doc(this.comment)
    .get()
    .subscribe(value => {
      this.current_comment = value.data() as Comments;
      console.log(this.current_comment);
      this.firestore
        .collection("users")
        .doc(this.current_comment["uid"])
        .get()
        .subscribe(value => {
          this.user_comment = value.data() as User;
          this.data_have = true;
          console.log(this.user_comment);
        });
    });
  }

  ngOnChanges(): void {


    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    //console.log(this.comment);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(typeof(this.comment));
    // console.log(this.comment);
    // for (let i = 0; i < this.comment.length; i++) {
    //   this.firestore.collection('comments').doc(this.comment[i]).snapshotChanges()
    //     .subscribe(data => {
    //       this.data_have =true;
    //       this.comment_content = data.payload.data();
    //       console.log(this.comment_content);
    //     })

    //}
  }
}
