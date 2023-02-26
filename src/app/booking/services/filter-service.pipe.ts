import { Pipe, PipeTransform } from '@angular/core';
import { BookingService } from '../booking.service';

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  constructor(private bookingService:BookingService){}

  transform(categories: Array<any>, filter:string, client:any): Array<any> {
    if(categories?.length){
      let service = categories.filter((availableItem:any)=> {
        return availableItem.name.toLowerCase().includes(filter.toLowerCase());
      });
      service.map((availableService:any)=>{
        availableService.availableItems.map((item:any)=>{
          item.selected = false;
        })
      });
      service = this.isServiceAdded(service, client);
      console.log("Filter Service : ", service);
      return service;
    }else{
      return categories[0];
    }
  }

  isServiceAdded(services:Array<any>, client:any){
    let selectedItems = this.bookingService.clientCart$.value.selectedItems;
    selectedItems = selectedItems.filter((selectedItem:any)=> {
      if(client!= 'me'){
        return selectedItem.guestId == client.id
      }else{
        return selectedItem.guestId == null;
      }
    });
    // console.log("selected Items : ", selectedItems);
    services.map((availableService:any)=>{
      availableService.availableItems.map((item:any)=>{
        selectedItems.map((selectedService:any)=>{
          if(item.id == selectedService.item.id){
            item.selected = true;
          }else{
            item.selected = false;
          }
        })
      })
    });
    return services;
  }

}
