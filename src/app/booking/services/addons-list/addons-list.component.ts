import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/shared-component/shared.service';
import { BookingService } from '../../booking.service';

@Component({
  selector: 'app-addons-list',
  templateUrl: './addons-list.component.html',
  styleUrls: ['./addons-list.component.scss']
})
export class AddonsListComponent {

  @Input() cart:any;

  constructor(public sharedService:SharedService, private bookingService:BookingService){}

  addModifier(modifier:any){
    let optionIds:Array<string | null> = this.getSelectedModifiers();
    let index = optionIds.indexOf(modifier.id);
    if(index < 0){
      const payload = {
        id: this.cart.selectedItems[0].id,
        optionIds: [...optionIds, modifier.id],
        staffId:null,
        guestId:null
      }
      this.bookingService.addAddonInCart(payload).subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Great Choice! Looking gorgeous';
          const message = 'ADDED TO CART';
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

  getSelectedModifiers():Array<string | null>{
    if(this.cart.selectedItems[0].selectedOptions.length){
      const ids = this.cart.selectedItems[0].selectedOptions.map((option:any)=> option.id);
      console.log('Selected options : ', ids);
      return ids;
    }else{
      return []
    }
  }

}
