import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from 'src/app/shared-component/shared.service';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Input() cart:any;
  @Output() onItemRemoveEvent = new EventEmitter<string>();
  toggleMobileCart:boolean = false;

  constructor(public bookingService:BookingService, public sharedService:SharedService, public router: Router) { }

  removeItem(item:any){
    let isSameService = this.sharedService.getLocalStorageItem("isSameService");
    if(isSameService == 'true' || !isSameService){
      this.onItemRemoveEvent.emit();
      this.bookingService.removeItemInCart(item.id).subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Success';
          const message = 'Service removed successfully.';
          this.sharedService.showNotification(title, message);
          this.bookingService.updateCartDetail();
        }else{
          this.sharedService.showNotification('Errors', res.errors[0].message);
        }
      });
    }else{
      const title = 'Please enable my guest can have different services.';
      const message = 'Then you will be able to add/remove services.';
      this.sharedService.showNotification(title, message);
    }
  }

  removeModifier(modifier:any, guestId:string){
    let isSameService = this.sharedService.getLocalStorageItem("isSameService");
    if(isSameService == 'true' || !isSameService){
      let selectedItems:any = this.cart.selectedItems.filter((selectedItem:any)=>{
        return selectedItem.guestId == guestId;
      })
      let optionIds:Array<string | null> = this.getSelectedModifiers(selectedItems);
      let index = optionIds.indexOf(modifier.id);
      optionIds.splice(index,1);
  
      const payload = {
        id: selectedItems[0].id,
        optionIds: [...optionIds],
        staffId:null,
        guestId:guestId
      }
      this.bookingService.addAddonInCart(payload).subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Addon removed';
          const message = 'REMOVED FROM CART';
          this.sharedService.showNotification(title, message);
          this.bookingService.updateCartDetail();
        }else{
          this.sharedService.showNotification('Errors', res.errors[0].message);
        }
      });
    }else{
      const title = 'Please enable my guest can have different services.';
      const message = 'Then you will be able to add/remove services.';
      this.sharedService.showNotification(title, message);
    }
  }

  getSelectedModifiers(selectedItems:any):Array<string | null>{
    if(selectedItems[0].selectedOptions.length){
      let ids = selectedItems[0].selectedOptions.map((option:any)=> option.id);
      return ids;
    }else{
      return []
    }
  }

  get getTotalAddedServiceCount(){
    let count = 0;
    if(this.cart && this.cart.selectedItems){
      let selectedItems = this.cart.selectedItems;
      if(selectedItems && selectedItems.length){
        selectedItems.map((selectedItem:any)=>{
          ++count;
          count = count + selectedItem.selectedOptions.length;
        })
      }
    }
    return count;
  }

  getServicePrice(selectedService:any){
    let optionsPrice = 0;
    selectedService.selectedOptions.map((option:any)=>{
      optionsPrice = optionsPrice + option.priceDelta;
    });
    return selectedService.price - optionsPrice;
  }

  getSelectedStaffVariant(){
    let selectedStaff:any;
    if(this.cart && this.cart.selectedItems && this.cart.selectedItems.length){
      let selectedItem = this.cart.selectedItems.filter((selectedItem:any)=>{
        return selectedItem.guestId == null;
      });
      if(selectedItem[0].selectedStaffVariant){
        selectedStaff = selectedItem[0].selectedStaffVariant.staff.displayName;
      }
    }
    return selectedStaff;
  }

  editLocation(){
    this.router.navigateByUrl("/booking", {replaceUrl: true});
  }
  

}
 