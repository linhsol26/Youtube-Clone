import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatVideoModule } from "mat-video";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
<<<<<<< HEAD
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
=======
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";

>>>>>>> acf6d1227222e777367949e024c569b8255179e8
@NgModule({
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatVideoModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
<<<<<<< HEAD
    MatInputModule,
    MatDialogModule
=======
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule
>>>>>>> acf6d1227222e777367949e024c569b8255179e8
  ]
})
export class MaterialComponentsModule {}
