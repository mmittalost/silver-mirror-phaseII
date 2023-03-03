import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

export interface Notification{
  title:string,
  message:string
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public $notification:BehaviorSubject<Notification> = new BehaviorSubject<Notification>({title:'',message:''});

  constructor(private toastrService: ToastrService) {
    this.$notification.subscribe((notification:Notification)=>{
      notification.title ? this.sendNotification(notification.title, notification.message) : null;
    })
   }

  sendNotification(title:string, message:string){
    const toast = this.toastrService.show('', '', {
      // timeOut:3000,
      easing:'ease-in',
      easeTime:300,
      // newestOnTop:true,
      // enableHtml:true
    })
    toast.toastRef.componentInstance.title = title;
    toast.toastRef.componentInstance.message = message;
    setTimeout(() => {
      this.toastrService.remove(toast.toastId);
    }, 5000);
  }
}
