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
  isSameServices:any = false;
  isGuestTabVisible:boolean = true;
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
      }
    })
  }

  ngAfterViewInit() {
    this.isSameServiceLocal();
  }

  isSameServiceLocal(){
    let flag = this.sharedService.getLocalStorageItem('isSameService');
    if(!flag || flag == 'true'){
      this.isSameServices = true;
    }else if(flag == 'false'){
      this.isSameServices = false;
      this.hideGuestTabs();
    }
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
  }

  resetServicesTab(){
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
          const title = 'Great choice! Looking gorgeous???';
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
    // runs when item is removed from cart
  }

  isAnyAddonAdded(){
    let flag = false;
    let catNames = [];
    this.cart.selectedItems.map((selectedItem:any) => {
      const catName = this.sharedService.getServiceCategoryName(selectedItem, this.cart.availableCategories);
      catName != '' ? catNames.push(catName) : null;
      console.log("Cat name : ", catNames.length);
      if(selectedItem.selectedOptions.length > 0){
        flag = true;
      }
    });
    if(!catNames.length){
      flag = true;
    }
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

  hideGuestTabs(){
    this.isGuestTabVisible = false;
  }

  copyItemsToGuest(){
    this.sharedService.setLocalStorageItem("isSameService", this.isSameServices.toString());
    if(!this.isSameServices && this.cart.selectedItems.length == 1){
      this.hideGuestTabs();
      const guests = this.cart.guests;
      const mySelectedItems = this.cart.selectedItems.filter((selectedItem:any)=> selectedItem.guestId == null)[0];
      let mySelectedModifiers:any = [];
      this.cart.selectedItems.filter((selectedItem:any)=> {
        if(selectedItem.guestId == null){
          let ids = selectedItem.selectedOptions.map((option:any)=> option.id);
          mySelectedModifiers = ids
        }
      });
      
      if(this.cart.selectedItems.length == 1){
        // Add items in cart
        guests.forEach((guest:any)=>{
          const payload = {
            id:mySelectedItems.item.id,
            staffId:null,
            guestId: guest.id,
            itemOptionIds: mySelectedModifiers
          }
          this.bookingService.addItemInCart(payload).subscribe((res:any)=>{
            if(!res.errors){
              this.bookingService.updateCartDetail();
            }
          });
        })
      }
      else{
        const title = 'Sevice already added for guest';
        const message = 'Please remove the guest services to copy my services.';
        this.sharedService.showNotification(title, message);
      }
    }else{
      this.isGuestTabVisible = true;
    }
  }

  canAllowDifferentService(){
    if(this.isSameServices && this.cart.selectedItems.length > 1){
      const title = 'Sevice already added for guest';
      const message = 'Please remove the guest services to copy my services.';
      this.sharedService.showNotification(title, message);
    }else if(this.cart.selectedItems.length < 1){
      const title = 'You have not added any service yet.';
      const message = 'Please add a service for yourself first.';
      this.sharedService.showNotification(title, message);
    }
  }

  continue(){
    window.scrollTo(0, 0);
    this.bookingService.toggleMobileCart();
    let cartMemberCount = this.cart.guests.length + 1;
    if(this.cart.selectedItems.length){
      if(this.cart.selectedItems.length == cartMemberCount){
        let flag = this.isAnyAddonAdded();
        if(!flag){
          this.addonModalRef = this.modalService.open(
            ModalIsAddonAddedComponent,
            this.modalConfig
          );
          this.addonModalRef.onClose.subscribe((choice:any)=>{
            if(choice && choice.choice){
              this.changeServiceTab('addon');
              this.resetServiceTabs = {event:true, currentTab:'addon'};
              setTimeout(() => {
                this.resetServiceTabs = {event:false, currentTab:'addon'};
              }, 1000);
            }else{
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