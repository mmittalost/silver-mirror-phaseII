import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderGuestTabs'
})
export class OrderGuestTabsPipe implements PipeTransform {

  transform(guests: Array<any>): Array<any> {
    if(guests.length){
      guests.sort((a, b) => {
        const labelA = a.label.toUpperCase();
        const labelB = b.label.toUpperCase();
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }
        return 0;
      });
    }
    return guests;
  }

}
