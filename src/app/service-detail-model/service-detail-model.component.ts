import { Component, Input } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { SilverMirrorService } from '../silver-mirror.service';
@Component({
  selector: 'app-service-detail-model',
  templateUrl: './service-detail-model.component.html',
  styleUrls: ['./service-detail-model.component.scss']
})
export class ServiceDetailModelComponent {
  @Input() service:any;
  modalRef: MdbModalRef<ModalComponent> | null = null;
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
    console.log("set", this.silverService.selectedServices);
    this.silverService.selectedServiceID = elem.id;
    if (this.silverService.cartDetails$.value.length == 0) {
      this.silverService.addItemInCart(elem.id);
      this.modalRef = this.modalService.open(ModalComponent, this.config);
      elem.active = !elem.active;
    } else {
      if (
        this.silverService.selectedServices.has(
          this.silverService.checkAddedServices
        )
      ) {
        alert("You can not add more than one service!!!");
      } else {
        this.silverService.addItemInCart(elem.id);
        this.modalRef = this.modalService.open(ModalComponent, this.config);
        elem.active = !elem.active;
      }
    }
}
}