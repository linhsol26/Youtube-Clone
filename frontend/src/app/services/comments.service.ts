import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Comments} from '../interfaces/comments';
import {DatabaseService} from './database.service';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private Firestore: AngularFirestore, private db: DatabaseService) { }
  getComments(comment: Comments) {
    return this.Firestore.collection('Comments').snapshotChanges();
  }
  createComment(comment: Comments) {
    this.db.addComment(comment);
  }


}
