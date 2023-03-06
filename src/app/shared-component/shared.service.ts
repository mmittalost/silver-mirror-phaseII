import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Notification, NotificationService } from '../notification.service';
import { ConfirmationAlertComponent } from './confirmation-alert/confirmation-alert.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  confirmationAlertModalRef!: MdbModalRef<ConfirmationAlertComponent> | null;

  modalConfig: any = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  };

  constructor( private notificationService:NotificationService, private modalService: MdbModalService ) { }

  getLocalStorageItem(key:string){
    return localStorage.getItem(key);
  }

  setLocalStorageItem(key:string, value:string){
    localStorage.setItem(key, value);
  }

  removeLocalStorageItem(key:string){
    localStorage.removeItem(key);
  }

  showNotification(title:string, message:string){
    const notification:Notification = {
      'title': title,
      'message': message
    }
    this.notificationService.$notification.next(notification);
  }

  formatPrice(price:number){
    return Math.floor(price/100);
  }

  getServiceCategoryName(service:any, categories:any){
    let categoryName = '';
    if(categories.length){
      categories.map((category:any)=>{
        category.availableItems.map((availableItem:any)=>{
          if(availableItem.id == service.item.id){
            categoryName = category.name;
          }
        })
      })
    }
    if(categoryName.toLowerCase().includes('facial')){
      return categoryName.replace("Facials ", "");
    }else{
      return '';
    }
  }

  openConfirmationAlert(message:string){
    this.modalConfig.data.message = message;
    return new Promise((resolve, reject)=>{
      this.confirmationAlertModalRef = this.modalService.open(
        ConfirmationAlertComponent,
        this.modalConfig
      );
      this.confirmationAlertModalRef.onClose.subscribe((data:any)=>{
        resolve(data);
      });
    });
  }

  removeLastTimezone(str: string): string {
    if (str.slice(-6).match(/[+-]\d{2}:\d{2}$/)) {
      return str.slice(0, -6); // remove the last 6 characters (-04:00)
    }
    return str;
  }

}
