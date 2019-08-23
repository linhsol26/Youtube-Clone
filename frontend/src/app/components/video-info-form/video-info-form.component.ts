import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-video-info-form",
  templateUrl: "./video-info-form.component.html",
  styleUrls: ["./video-info-form.component.scss"]
})
export class VideoInfoFormComponent implements OnInit {
  @Input("video-data") videoData: any;
  @Output("form-validation") form = new EventEmitter();

  privacyChoices = [
    { key: "private", name: "Private" },
    { key: "public", name: "Public" }
  ];

  constructor() {}
  ngOnInit() {}

  // select
  changePrivacy(value) {
    this.videoData.privacy = value;
  }

  // tag chips
  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add the tag
    if ((value || "").trim()) this.videoData.tags.push(value.trim());
    // Reset the input value
    if (input) input.value = "";
  }

  remove(tag: string): void {
    const index = this.videoData.tags.indexOf(tag);
    if (index >= 0) this.videoData.tags.splice(index, 1);
  }

  log() {
    console.log(this.videoData);
  }

  // form validation
  titleValid = new FormControl("", [
    Validators.required,
    Validators.minLength(5)
  ]);

  getErrorMessage() {
    return this.titleValid.hasError("required")
      ? "You must enter a value"
      : this.titleValid.hasError("minlength")
      ? "Min 5 characters"
      : "";
  }

  blur(element: HTMLInputElement) {
    element.blur();
  }

  onChange() {
    this.form.emit(this.titleValid.valid);
  }
}
