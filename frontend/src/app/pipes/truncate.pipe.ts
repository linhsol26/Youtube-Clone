import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate"
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, max: number = 50): any {
    if (value.length > max) value = value.substring(0, max) + "...";
    return value;
  }
}
