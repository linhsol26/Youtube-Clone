import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";


//thêm file matvideo module

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./modules/material-components.module";

import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { LoginComponent } from './components/login/login.component';


//thêm firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
//thêm envi
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent, MenuBarComponent, SideBarComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialComponentsModule,AngularFireAuthModule,AngularFireModule,AngularFireModule.initializeApp(environment.firebase)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
