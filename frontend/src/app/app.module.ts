import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// mat-video module
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./modules/material-components.module";

import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { LoginComponent } from "./components/login/login.component";
import { Routes, RouterModule } from "@angular/router";

// firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";

import { UserGoogleService } from "./services/user-google.service";
import { HomeComponent } from "./components/home/home.component";
import { UploadComponent } from "./components/upload/upload.component";
import { WatchComponent } from "./components/watch/watch.component";
import { MatVideoModule } from "mat-video";
import { UploadInputComponent } from "./components/upload-input/upload-input.component";
import { UserService } from "./services/user.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "upload", component: UploadComponent },
  { path: "watch/:vid", component: WatchComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    SideBarComponent,
    LoginComponent,
    UploadInputComponent,
    HomeComponent,
    UploadComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    MaterialComponentsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatVideoModule
  ],
  providers: [UserService, UserGoogleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
