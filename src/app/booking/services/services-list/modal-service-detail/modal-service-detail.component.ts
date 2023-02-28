import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/booking/booking.service';
import { SharedService } from 'src/app/shared-component/shared.service';

@Component({
  selector: 'app-modal-service-detail',
  templateUrl: './modal-service-detail.component.html',
  styleUrls: ['./modal-service-detail.component.scss']
})
export class ModalServiceDetailComponent {

  @Input() service:any;
  @Input() client:any;

  cart:any;
  cartSubscription:any;

  constructor(public sharedService:SharedService, private bookingService:BookingService, public serviceModalRef: MdbModalRef<ModalServiceDetailComponent>){
    this.cartSubscription = this.bookingService.clientCart$.subscribe((cart:any)=>{
      if(cart){
        this.cart = cart;
      }
    })
  }

  addService(){
    console.log("GUEST : ", this.client);
    let selected:boolean = false;
    this.cart.selectedItems.map((selectedItem:any)=>{
      if(this.client != 'me'){
        selectedItem.guestId == this.client.id ? selected = true : null;
      }else{
        selectedItem.guestId == null ? selected = true : null;
      }
    })

    if(!selected){
      const payload = {
        id: this.service.id,
        staffId:null,
        guestId:this.client != 'me' ? this.client.id : null
      }
      this.bookingService.addItemInCart(payload).subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Great Choice! Looking gorgeous';
          const message = 'ADDED TO CART';
          this.cartSubscription.unsubscribe();
          this.serviceModalRef.close();
          this.sharedService.showNotification(title, message);
          this.bookingService.updateCartDetail();
        }else{
          this.sharedService.showNotification('Errors', res.errors[0].message);
        }
      });
    }else{
      const title = 'Service already added!';
      const message = 'Please remove existing service from cart.';
      this.sharedService.showNotification(title, message);
    }
  }

}
