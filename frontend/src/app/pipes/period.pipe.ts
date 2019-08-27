import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "period"
})
export class PeriodPipe implements PipeTransform {
  transform(timestamp: number): string {
    
    return null;
  }
}
