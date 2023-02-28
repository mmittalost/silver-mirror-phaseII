import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from '../../shared-component/shared.service';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {

  appointment:any;
  toggleOptions:boolean = false;
  toggleShareOptions:boolean = false;
  authUser:any;

  constructor(private bookingService:BookingService, public sharedService:SharedService, private authService:AuthService){
    this.authService.$AuthUser.subscribe((user:any)=>{
      this.authUser = user;
    })
    this.bookingService.checkoutBookingResponse$.subscribe((checkoutCart:any)=>{
      if(checkoutCart){
        console.log("Checkout Response : ", checkoutCart);
        const aptId = checkoutCart.appointments[0].appointmentId;
        const cartId = checkoutCart.cart.id
        this.getAppointmentDetail(aptId, cartId);
      }
    })
  }

  getAppointmentDetail(aptId:string, cartId:string){
    this.bookingService.getAppointmentDetail(aptId, cartId).subscribe((res:any)=>{
      if(!res.errors){
        this.appointment = res.data.appointment;
        this.getServicePrice();
      }else{
        console.log(res.errors);
      }
    });
  }

  getServicePrice(){
    let optionsPrice = 0;
    this.appointment.appointmentServiceOptions.map((option:any)=>{
      optionsPrice = optionsPrice + option.priceDelta;
    });
    return this.appointment.appointmentServices[0].price - optionsPrice;
  }

  getServicesCount(){
    return this.appointment.appointmentServiceOptions.length + this.appointment.appointmentServices.length;
  }

  shareViaEmail() {
    const shareVariables = {
      date: moment(this.appointment.startAt.slice(0, -6)).format('MMMM DD, YYYY @ h:mm A'),
      location: this.appointment.location.address.city,
      address: this.appointment.location.address.line1
    }
    
    const subject = 'Silvermirror appointment';
    const body = `booked my facial at Silver Mirror!\n ${shareVariables.date} ${shareVariables.location} ${shareVariables.address} Join me and get 20% off your first facial with promocode FIRST20.\nURL: https://bookings.silvermirror.com`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }

  shareOnTwitter() {
    const shareVariables = {
      date: moment(this.appointment.startAt.slice(0, -6)).format('MMMM DD, YYYY @ h:mm A'),
      location: this.appointment.location.address.city,
      address: this.appointment.location.address.line1
    }

    const tweetText = `booked my facial at Silver Mirror!\n ${shareVariables.date} ${shareVariables.location} ${shareVariables.address} Join me and get 20% off your first facial with promocode FIRST20.\nURL: https://bookings.silvermirror.com`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl);
  }

  shareOnFacebook(){
    const shareVariables = {
      date: moment(this.appointment.startAt.slice(0, -6)).format('MMMM DD, YYYY @ h:mm A'),
      location: this.appointment.location.address.city,
      address: this.appointment.location.address.line1
    }

    const shareText = `booked my facial at Silver Mirror!\n ${shareVariables.date} ${shareVariables.location} ${shareVariables.address} Join me and get 20% off your first facial with promocode FIRST20.`;

    const shareUrl = 'https://www.facebook.com/sharer/sharer.php';
    const url = encodeURIComponent('https://bookings.silvermirror.com');
    const title = encodeURIComponent(shareText);
    const shareParams = `?u=${url}&title=${title}`;
  
    window.open(shareUrl + shareParams, '_blank');
  }

}