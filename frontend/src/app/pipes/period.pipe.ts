import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "period"
})
export class PeriodPipe implements PipeTransform {
  transform(timestamp: number): string {
    let diff = Math.floor((Date.now() - timestamp) / 1000);
    let unit = "";
    if (diff < 60) {
      // minute
      unit = diff == 1 ? " second" : " seconds";
    } else if (diff < 3600) {
      // hour
      diff = Math.floor(diff / 60);
      unit = diff == 1 ? " minute" : " minutes";
    } else if (diff < 86400) {
      // day
      diff = Math.floor(diff / 3600);
      unit = diff == 1 ? " hour" : " hours";
    } else if (diff < 2592000) {
      // month
      diff = Math.floor(diff / 86400);
      unit = diff == 1 ? " day" : " days";
    } else if (diff < 31104000) {
      // year
      diff = Math.floor(diff / 2592000);
      unit = diff == 1 ? " month" : " months";
    } else {
      diff = Math.floor(diff / 31104000);
      unit = diff == 1 ? " year" : " years";
    }
    return diff + unit + " ago";
  }
}
