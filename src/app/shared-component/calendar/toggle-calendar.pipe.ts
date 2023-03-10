import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCalendar'
})
export class ToggleCalendarPipe implements PipeTransform {

  transform(calendar: Array<any>, toggle:boolean, index:number): Array<any> {
    if(!toggle && index > -1){
      return [calendar[index]];
    }else{
      return calendar;
    }
  }

}
