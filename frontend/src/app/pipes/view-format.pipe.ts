import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "viewFormat"
})
export class ViewFormatPipe implements PipeTransform {
  transform(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num < 10000) {
      return (Math.floor((num * 10) / 1000) / 10).toString() + "K";
    } else if (num < 1000000) {
      // less than 1 million
      return Math.floor(num / 1000).toString() + "K";
    } else if (num < 10000000) {
      // less than 10 million
      return (Math.floor((num * 10) / 1000000) / 10).toString() + "M";
    } else if (num < 1000000000) {
      // less than 1 billion
      return Math.floor(num / 1000000).toString() + "M";
    } else if (num < 10000000000) {
      // less than 10 billion
      return (Math.floor((num * 10) / 1000000000) / 10).toString() + "B";
    } else {
      return Math.floor(num / 1000000000).toString() + "B";
    }
  }
}
