import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UploadComponent } from "./components/upload/upload.component";
import { WatchComponent } from "./components/watch/watch.component";
import { MatVideoModule } from 'mat-video';
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "upload", component: UploadComponent },
  { path: "watch/:vid", component: WatchComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [HomeComponent, UploadComponent, WatchComponent],
  imports: [RouterModule.forRoot(routes),MatVideoModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
