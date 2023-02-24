import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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

  constructor(private router:Router, private bookingService:BookingService) {
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
 
  gotoServices(){
    console.log("Tab : ", this.tab);
    if(this.tab == 'guest'){
      if(this.cart && this.cart.guests.length < this.guestCount){
        this.createGuests(this.guestCount - this.cart.guests.length);
      }else if(this.cart && this.cart.guests.length > this.guestCount){
        this.removeGuests(this.cart.guests.length - this.guestCount);
      }
      this.router.navigateByUrl('/booking/services');
    }else{
      const guests = this.cart.guests;
      if(guests.length){
        this.removeGuests(guests.length);
      }
      this.router.navigateByUrl('/booking/services');
    }
  }
}
