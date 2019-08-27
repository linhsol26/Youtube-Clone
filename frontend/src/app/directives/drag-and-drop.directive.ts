// source: https://medium.com/@mariemchabeni/angular-7-drag-and-drop-simple-file-uploadin-in-less-than-5-minutes-d57eb010c0dc

import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appDragDrop]"
})
export class DragAndDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding("style.opacity") public opacity = "1";

  //Dragover listener
  @HostListener("dragover", ["$event"]) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = "0.7";
  }

  //Dragleave listener
  @HostListener("dragleave", ["$event"]) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.opacity = "1";
  }

  //Drop listener
  @HostListener("drop", ["$event"]) public onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}
