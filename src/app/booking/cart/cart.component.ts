import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/shared-component/shared.service';
import { SilverMirrorService } from '../../silver-mirror.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Input() cart:any;

  constructor(private bookingService:BookingService, public sharedService:SharedService) { }

  removeItem(item:any){
    console.log("remove item : ", item);
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
  }

}
