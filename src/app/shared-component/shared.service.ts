import { Injectable } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private notificationService:NotificationService ) { }

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

}
