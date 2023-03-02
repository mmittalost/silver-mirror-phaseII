import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SharedService } from 'src/app/shared-component/shared.service';
import { BookingService } from '../booking.service';
import { ModalAddonsComponent } from './modal-addons/modal-addons.component';
import { ModalIsAddonAddedComponent } from './modal-is-addon-added/modal-is-addon-added.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  tabs:{
    timeFilters:string;
    guest:any;
    service:string;
  } = {
    timeFilters: '30',
    guest:'me',
    service:'Facials 30 Minutes'
  }
  resetServiceTabs:any;
  resetTimeTabs:any;
  serviceFilter:string='Facials 30 Minutes'
  cart:any;
  addonModalRef!: MdbModalRef<ModalAddonsComponent> | null;
  isAddonAddedModalRef!: MdbModalRef<ModalIsAddonAddedComponent> | null;
  modalConfig: any = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  };

  constructor(public bookingService:BookingService, private sharedService:SharedService, private router:Router, private modalService: MdbModalService){
    bookingService.updateCartDetail();
    bookingService.clientCart$.subscribe((cart)=>{
      if(cart){
        this.cart = cart;
        this.getMemberAddedServiceCount;
        console.log(this.cart);
      }
    })
  }

  changeServiceTab(ev:any){
    if(ev == 'facial'){
      this.tabs.service = 'Facials 30 Minutes';  
    }else if(ev !='addon'){
      this.tabs.service = ev;
    }else if (ev == 'addon'){
      let selectedItems;
      if(this.tabs.guest != 'me'){
        selectedItems = this.cart.selectedItems.filter((item:any)=>item.guestId == this.tabs.guest.id);
      }else{
        selectedItems = this.cart.selectedItems.filter((item:any)=>item.guestId == null);
      }
      
      if(selectedItems.length){
        this.tabs.service = 'addon';
      }else{
        this.resetServicesTab();
        const title = 'Service not added';
        const message = 'Please add a service first.';
        this.sharedService.showNotification(title, message);
      }
    }
    /*
      * uncomment to Show addon popup on addon tab 
    */
    // else if(ev == 'addon'){
    //   console.log('addon popup');
    //   if(this.cart.selectedItems.length){
    //     console.log(this.cart.selectedItems[0].addons);
    //     this.modalConfig.data.selectedItem = this.cart.selectedItems;
    //     this.addonModalRef = this.modalService.open(
    //       ModalAddonsComponent,
    //       this.modalConfig
    //     );
    //   }else{
    //   const title = '';
    //   const message = 'Please add a service first.';
    //   this.sharedService.showNotification(title, message); 
    //   }
      
    // }
  }

  resetServicesTab(){
    console.log("9 : ", this.tabs);
    let currentTab:string = '';
    if(this.tabs.service.toLowerCase().includes('facial')){
      currentTab = 'facial';
      this.resetTimeTab();
    }else if(this.tabs.service == 'addon'){
      currentTab = 'facial';
      this.resetTimeTab();
    }else{
      currentTab = this.tabs.service;
    }
    this.resetServiceTabs = {event:true, currentTab:currentTab};
    setTimeout(() => {
      this.resetServiceTabs = {event:false, currentTab:currentTab};
    }, 1000);
  }

  resetTimeTab(){
    this.resetTimeTabs = '30';
    setTimeout(() => {
      this.resetTimeTabs = null;
    }, 1000);
  }

  changeGuestTab(ev:any){
    if(this.tabs.service == 'addon'){
      let selectedItems;
      if(ev != 'me'){
        selectedItems = this.cart.selectedItems.filter((item:any)=>item.guestId == ev.id);
      }else{
        selectedItems = this.cart.selectedItems.filter((item:any)=>item.guestId == null);
      }
      if(selectedItems && selectedItems.length){
        this.tabs.guest = ev;
      }else{
        this.resetServicesTab();
        const title = 'Service not added';
        const message = 'Please add a service first.';
        this.sharedService.showNotification(title, message); 
      }
    }
    this.tabs.guest = ev;
  }

  changeTimeFilterTab(ev:any){
    this.tabs.timeFilters = ev;
    if(ev == '30'){
      this.tabs.service = 'Facials 30 Minutes'
    }else if(ev == '50'){
      this.tabs.service = 'Facials 50 Minutes'
    }
  }

  addService(service:any){
    let selected:boolean = false;
    this.cart.selectedItems.map((selectedItem:any)=>{
      if(this.tabs.guest != 'me'){
        selectedItem.guestId == this.tabs.guest.id ? selected = true : null;
      }else{
        selectedItem.guestId == null ? selected = true : null;
      }
    })
    
    if(!selected){
      const payload = {
        id:service.id,
        staffId:null,
        guestId:this.tabs.guest != 'me' ? this.tabs.guest.id : null
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

  itemRemovedFromCart(){
    // console.log('Item Removed from cart');
    // this.tabs.service = 'Facials 30 Minutes';
  }

  isAnyAddonAdded(){
    let flag = false;
    this.cart.selectedItems.map((selectedItem:any) => {
      if(selectedItem.selectedOptions.length > 0){
        flag = true;
      }
    });
    return flag;
  }

  get getMemberAddedServiceCount(){
    let count = 0;
    if(this.cart.guests && this.cart.guests.length){
      this.cart.guests.map((guest:any)=>{
        if(this.cart && this.cart.selectedItems && this.cart.selectedItems.length){
          let selectedItems = this.cart.selectedItems.filter((selectedItem:any)=>{
            return selectedItem.guestId == guest.id
          });
          selectedItems.map((selectedItem:any)=>{
            ++count;
            count = count + selectedItem.selectedOptions.length;
            guest.addedServiceCount = count;
            count = 0;
          });
        }
      });
      let meAsGuest = {"label":"me", "addedServiceCount": 0};
      let selectedItems = this.cart.selectedItems.filter((selectedItem:any)=>{
        return selectedItem.guestId == null
      });
      selectedItems.map((selectedItem:any)=>{
        ++count;
        count = count + selectedItem.selectedOptions.length;
        meAsGuest.addedServiceCount = count;
        count = 0;
      });
      return [...this.cart.guests, meAsGuest];
    }
    return [];
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

  continue(){
    window.scrollTo(0, 0);
    this.bookingService.toggleMobileCart();
    let cartMemberCount = this.cart.guests.length + 1;
    if(this.cart.selectedItems.length){
      if(this.cart.selectedItems.length == cartMemberCount){
        let flag = this.isAnyAddonAdded();
        console.log("Is addon added : ", flag);
        if(!flag){
          this.addonModalRef = this.modalService.open(
            ModalIsAddonAddedComponent,
            this.modalConfig
          );
          this.addonModalRef.onClose.subscribe((choice:any)=>{
            console.log("transfered choice : ", choice);
            if(choice && choice.choice){

              // write code to show addon list

            }else{
              console.log("Continue");
              this.router.navigateByUrl('/booking/schedule');
            }
          })
        }else{
          this.router.navigateByUrl('/booking/schedule');
        }
      }else{
        const title = 'Service not added for member';
        const message = 'Please add the service for all members.';
        this.sharedService.showNotification(title, message);  
      }
    }else{
      const title = 'Cart is empty';
      const message = 'Add service to continue';
      this.sharedService.showNotification(title, message);
    }
  }

}
