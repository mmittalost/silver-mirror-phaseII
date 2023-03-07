import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/shared-component/shared.service';
import { SilverMirrorService } from '../../silver-mirror.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-whos-coming',
  templateUrl: './whos-coming.component.html',
  styleUrls: ['./whos-coming.component.scss']
})
export class WhosComingComponent {

  tab:string = 'me';
  guestCount:number = 1;
  cart:any;

  constructor(private router:Router, private bookingService:BookingService, private sharedService:SharedService) {
    this.bookingService.updateCartDetail();
    bookingService.clientCart$.subscribe((cart)=>{
      this.cart = cart;
      if(cart && cart.guests?.length){
        this.tab = 'guest';
        this.guestCount = cart.guests.length;
      }
    })
   }

  selectGuest(){
    console.log(this.guestCount);
  }

  createGuests(count:number){
    const requests = [];
    for (let index = 0; index < count; index++) {
        requests.push(this.bookingService.createGuest());
    }
    console.log("Guest requests : ", requests);
    forkJoin(requests).subscribe(res=>{
      console.log("Guest created");
      this.bookingService.updateCartDetail();
    });
  }

  removeGuests(count:number){
    const requests = [];
    const guests = this.cart.guests;
    for (let index = 0; index < count; index++) {
        requests.push(this.bookingService.removeGuest(guests[index].id));
    }
    console.log("Guest requests : ", requests);
    forkJoin(requests).subscribe(res=>{
      console.log("Guest created");
      this.bookingService.updateCartDetail();
    });
  }

  resetCart(){
    const message = "If you remove guests, You will lose the added services in cart."
    let locationId = this.cart.location.id;
    this.sharedService.openConfirmationAlert(message).then((res:any)=>{
      if(res){
        this.bookingService.createCart(locationId).subscribe((res:any)=>{
          if(!res.errors){
            this.sharedService.removeLocalStorageItem('isSameService');
            this.sharedService.setLocalStorageItem('cartId', res.data.createCart.cart.id);
            this.tab != 'me' ? this.createGuests(this.guestCount) : null;
            this.bookingService.updateCartDetail();
            this.router.navigateByUrl('/booking/services')
          }else{
            this.sharedService.showNotification("Error", res.errors[0].message);
          }
        });
      }
    });
  }

  gotoServices(){
    let guestSet = this.sharedService.getLocalStorageItem('guestSet');
    if(guestSet){
      if(this.cart && this.cart.guests.length > this.guestCount){
        this.resetCart();
      }else if(this.cart && this.cart.guests.length < this.guestCount){
        this.tab != 'me' ? this.createGuests(this.guestCount - this.cart.guests.length) : null;
        this.bookingService.updateCartDetail();
        this.router.navigateByUrl('/booking/services');
      }
      else if(this.tab == 'me' && this.cart.guests.length){
        this.resetCart();
      }else{
        this.router.navigateByUrl('/booking/services');
      }
    }else{
      if(this.tab =='guest'){
        this.sharedService.setLocalStorageItem('guestSet', 'true');
        this.createGuests(this.guestCount);
        this.router.navigateByUrl('/booking/services')
      }else{
        this.sharedService.setLocalStorageItem('guestSet', 'true');
        this.router.navigateByUrl('/booking/services');
      }
    }
  }
}
