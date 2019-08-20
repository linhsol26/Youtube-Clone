import {
  trigger,
  state,
  style,
  transition,
  animate,
  animation
} from "@angular/animations";

export const fadeAnimation = trigger("fade", [
  state(
    "in",
    style({
      opacity: 1
    })
  ),
  state(
    "out",
    style({
      opacity: 0
    })
  ),
  transition("in => out", animate("500ms ease-in")),
  transition("out => in", animate("500ms ease-out"))
]);
