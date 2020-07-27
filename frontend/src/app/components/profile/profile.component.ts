import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { map } from 'rxjs/operators';
import { UserGoogleService } from 'src/app/services/user-google.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    public userGG: UserGoogleService,
  ) {}
  ngOnInit() {}
}
