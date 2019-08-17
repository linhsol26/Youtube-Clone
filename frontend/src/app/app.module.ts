import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./modules/material-components.module";

import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [AppComponent, MenuBarComponent, SideBarComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
