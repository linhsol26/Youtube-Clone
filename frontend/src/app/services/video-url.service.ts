import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {IVideo} from '../interfaces/video';
@Injectable({
  providedIn: 'root'
})
export class VideoUrlService {
 videocollection: AngularFirestoreCollection<IVideo>;
    Videos: Observable<object>;
  constructor(private afs : AngularFirestore) {
    this.Videos = this.afs.collection('videos').valueChanges();
    
   
   } 
   getVideos(){
      return this.Videos;
    }
}
