import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument} from "@angular/fire/firestore";
import { Comments} from "../interfaces/comments"
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private Firestore : AngularFirestore) { }

  getComments (comment : Comments){
    return this.Firestore.collection('Comments').snapshotChanges();
  }
  createComment(comment : Comments){
    return this.Firestore.collection('Comments').doc;
  }
  
  
}
