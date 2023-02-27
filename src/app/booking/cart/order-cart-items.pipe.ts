import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderCartItems'
})
export class OrderCartItemsPipe implements PipeTransform {

  transform(selectedItems: Array<any>): Array<any> {
    if(selectedItems.length){
      selectedItems.sort((a, b) => {
        if (a.guest === null && b.guest === null) {
          return 0;
        }
        if (a.guest === null) {
          return -1;
        }
        if (b.guest === null) {
          return 1;
        }
        const labelA = a.guest.label.toUpperCase();
        const labelB = b.guest.label.toUpperCase();
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }
        return 0;
      });
      return selectedItems;
    }else{
      return selectedItems
    }
  }

}
