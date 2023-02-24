import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SharedService } from 'src/app/shared-component/shared.service';
import { BookingService } from '../booking.service';
import { ModalAddonsComponent } from './modal-addons/modal-addons.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  tabs = {
    timeFilters: '30',
    guest:'me',
    service:'Facials 30 Minutes'
  }
  serviceFilter:string='Facials 30 Minutes'
  cart:any;
  addonModalRef!: MdbModalRef<ModalAddonsComponent> | null;
  modalConfig: any = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  };

  constructor(private bookingService:BookingService, private sharedService:SharedService, private router:Router, private modalService: MdbModalService){
    bookingService.updateCartDetail();
    bookingService.clientCart$.subscribe((cart)=>{
      if(cart){
        this.cart = cart;
        console.log(this.cart);
      }
    })
  }

  changeServiceTab(ev:any){
    if(ev == 'facial'){
      this.tabs.service = 'Facials 30 Minutes';  
    }else if(ev !='addon'){
      this.tabs.service = ev;
    }else if(ev == 'addon'){
      console.log('addon popup');
      this.addonModalRef = this.modalService.open(
        ModalAddonsComponent,
        this.modalConfig
      );
    }
    console.log(this.tabs);
  }

  changeGuestTab(ev:any){
    console.log(ev);
    this.tabs.guest = ev;
  }

  changeTimeFilterTab(ev:any){
    this.tabs.timeFilters = ev;
    if(ev == '30'){
      this.tabs.service = 'Facials 30 Minutes'
    }else if(ev == '50'){
      this.tabs.service = 'Facials 50 Minutes'
    }
    console.log(this.tabs);
  }

  addService(service:any){
    if(!this.cart.selectedItems.length){
      const payload = {
        id:service.id,
        staffId:null,
        guestId:null
      }
      this.bookingService.addItemInCart(payload).subscribe((res:any)=>{
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
      const title = 'Service already added!';
      const message = 'Please remove existing service from cart.';
      this.sharedService.showNotification(title, message);
    }
  }

  continue(){
    if(this.cart.selectedItems.length){
      this.router.navigateByUrl('/booking/schedule');
    }else{
      const title = 'Cart is empty';
      const message = 'Add service to continue';
      this.sharedService.showNotification(title, message);
    }
  }

}
