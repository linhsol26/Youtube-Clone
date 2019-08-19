import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "diskSize"
})
export class DiskSizePipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1024) {
      return value + "bytes";
    } else if (value >= 1024 && value < 1048576) {
      return (value / 1024).toFixed(1) + "KB";
    } else {
      return (value / 1048576).toFixed(1) + "MB";
    }
  }
}
