import { Component, OnInit } from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {Comments} from '../../interfaces/comments'
@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
