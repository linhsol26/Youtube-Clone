import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  exports: [BrowserAnimationsModule, MatIconModule, MatButtonModule]
})
export class MaterialComponentsModule {}
