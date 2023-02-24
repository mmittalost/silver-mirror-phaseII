import { Component } from '@angular/core';
import { SharedService } from '../../shared-component/shared.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {

  appointment:any;

  constructor(private bookingService:BookingService, public sharedService:SharedService){
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

}