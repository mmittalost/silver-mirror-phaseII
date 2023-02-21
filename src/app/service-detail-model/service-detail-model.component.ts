import { Component, Input } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { ServiceNotificationComponent } from '../service-notification/service-notification.component';
import { SilverMirrorService } from '../silver-mirror.service';
@Component({
  selector: 'app-service-detail-model',
  templateUrl: './service-detail-model.component.html',
  styleUrls: ['./service-detail-model.component.scss']
})
export class ServiceDetailModelComponent {
  @Input() service:any;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRefNotification: MdbModalRef<ServiceNotificationComponent> | null = null;
  config = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  };
  constructor(public modalRefService: MdbModalRef<ServiceDetailModelComponent>,private modalService: MdbModalService,public silverService:SilverMirrorService) {
    console.log("this.modalRefService",this.modalRefService);
   
    setTimeout(() => {
      console.log("this.modalRefServicedata",this.service);
  }, 1000);
    
  }
  addToCart(elem: any) {
    this.silverService.selectedServiceID = elem.id;
    if (this.silverService.cartDetails$.value.length == 0) {
      this.silverService.addItemInCart(elem.id);
      this.modalRef = this.modalService.open(ModalComponent, this.config);
      elem.active = !elem.active;
    } else {
      const found = this.silverService.selectedTabWithServices.some((item:any) => item.hasOwnProperty(this.silverService.guestName));
      if (found) {
        elem.selected=false;
        this.modalRefNotification = this.modalService.open(ServiceNotificationComponent,this.config);
      } else {
        elem.selected=true;
        this.silverService.addItemInCart(elem.id);
        this.modalRef = this.modalService.open(ModalComponent, this.config);
      }
    }
}
}