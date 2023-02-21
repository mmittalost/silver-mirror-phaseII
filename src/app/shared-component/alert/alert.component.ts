import { Component, Input } from '@angular/core';
import { NotificationService, Notification } from 'src/app/notification.service';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() message!:string;
  @Input() title!:string;
  // title!:string;
  // message!:string;
  
  constructor(private toastrService:ToastrService /*private notificationService:NotificationService*/) {
    // this.notificationService.$notification.subscribe((notification:Notification)=>{
    //   this.title = notification.title;
    //   this.message = notification.message;
    //   console.log("Notification Message : ", notification);
    // })
  }
}
