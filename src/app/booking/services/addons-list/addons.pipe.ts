import { Pipe, PipeTransform } from "@angular/core";
import { BookingService } from "../../booking.service";

@Pipe({
  name: "addons",
})
export class AddonsPipe implements PipeTransform {

  constructor(private bookingService:BookingService){}

  transform(selectedItems: Array<any>, client:any): Array<any> {
    let addons:any = [];
    let items:any = selectedItems.filter((selectedItem:any)=>{
      if(client != 'me'){
        return selectedItem.guestId == client.id;
      }else{
        return selectedItem.guestId == null;
      }
    })

    if(items.length){
      addons = items[0].addons;
    }else{
      addons = items;
    }

    // filter addon modifier
    if (addons && addons.length) {
      let formatResponse: any = [];
      addons.map((addon:any) => {
        if(addon.optionGroups.length){
          addon.optionGroups[0].options.map((option: any) => {
            formatResponse.push(option);
          });
        }
      });
      formatResponse = this.isAddonAdded(formatResponse, items);
      return formatResponse;
    } else {
      return addons;
    }
  }

  isAddonAdded(options:Array<any>, selectedItems:Array<any>){
    if(options.length){
      options.map((option:any)=>{
        selectedItems[0].selectedOptions.map((selectedOption:any)=>{
          selectedOption.id == option.id ? option.selected = true : null;
        })
      })
      return options
    }else{
      return options
    }
  }
}
