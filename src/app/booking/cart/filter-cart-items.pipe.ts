import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCartItems'
})
export class FilterCartItemsPipe implements PipeTransform {

  transform(selectedItems: Array<any>, client:any): Array<any> {
    console.log('selectedItems : ', selectedItems);
    selectedItems.filter((selectedItem:any)=>{
      if(client != 'me'){
        return selectedItem.guestId == client.id
      }else{
        return selectedItem.guestId == null;
      }
    })
    return selectedItems;
  }

}
