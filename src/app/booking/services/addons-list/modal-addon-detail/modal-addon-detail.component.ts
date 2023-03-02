import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/booking/booking.service';
import { SharedService } from 'src/app/shared-component/shared.service';

@Component({
  selector: 'app-modal-addon-detail',
  templateUrl: './modal-addon-detail.component.html',
  styleUrls: ['./modal-addon-detail.component.scss']
})
export class ModalAddonDetailComponent {

  @Input() addon:any;
  @Input() client:any;

  cart:any;
  cartSubscription:any;

  constructor(public sharedService:SharedService, private bookingService:BookingService, public addonModalRef: MdbModalRef<ModalAddonDetailComponent>){
    this.cartSubscription = this.bookingService.clientCart$.subscribe((cart:any)=>{
      if(cart){
        this.cart = cart;
      }
    });
    setTimeout(() => {
      console.log("addon detail modal : ", this.addon);
    }, 1000);
  }

  addModifier(guestId:string|null){
    let selectedItems:any = this.cart.selectedItems.filter((selectedItem:any)=>{
      return selectedItem.guestId == guestId;
    })
    console.log("SELECTED ITEMS : ", selectedItems);
    let optionIds:Array<string | null> = this.getSelectedModifiers(selectedItems);
    console.log(selectedItems, optionIds);
    let index = optionIds.indexOf(this.addon.id);
    if(index < 0){
      const payload = {
        id: selectedItems[0].id,
        optionIds: [...optionIds, this.addon.id],
        staffId:null,
        guestId: guestId
        // this.client != 'me' ? this.client.id : null
      }
      this.bookingService.addAddonInCart(payload).subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Great Choice! Looking gorgeous';
          const message = 'ADDED TO CART';
          this.addonModalRef.close()
          this.sharedService.showNotification(title, message);
          this.bookingService.updateCartDetail();
        }else{
          this.sharedService.showNotification('Errors', res.errors[0].message);
        }
      });
    }else{
      const title = 'Addon already added';
      const message = 'please choose another addon to add in cart.';
      this.sharedService.showNotification(title, message);
    }
  }

  addModifierForAll(){
    let isSameService = this.sharedService.getLocalStorageItem('isSameService');
    console.log('ISSJSJHJSHJS : ', isSameService);
    if(isSameService == 'false'){
      this.addModifier(null);
      let guests = this.cart.guests;
      guests.map((guest:any)=>{
        this.addModifier(guest.id);
      })
    }else{
      this.addModifier(this.client.id)
    }
  }

  getSelectedModifiers(selectedItems:any):Array<string | null>{
    if(selectedItems.length && selectedItems[0].selectedOptions && selectedItems[0].selectedOptions.length){
      const ids = selectedItems[0].selectedOptions.map((option:any)=> option.id);
      console.log('Selected options : ', ids);
      return ids;
    }else{
      return []
    }
  }

}
 