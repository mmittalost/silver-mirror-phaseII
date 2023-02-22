import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {

  transform(timeArray: Array<any>, range:{min:number, max:number}): Array<any> {
    if(timeArray.length){
      return timeArray.filter((time:any)=>{
        const _time = time.startTime.slice(0, -6);
  
        let hour = new Date(_time).getHours();
        const minutes = new Date(_time).getMinutes();
        minutes > 0 ? ++hour : null;
        if(hour >=range.min && hour <= range.max){
          return time;
        }
      })
    }else{
      return timeArray;
    }
  }

}
