import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import{ModalComponent} from '../modal/modal.component';
import{ServiceDetailModelComponent} from '../service-detail-model/service-detail-model.component'


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  facialName = "Facials 30 Minutes";
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRefService: MdbModalRef<ServiceDetailModelComponent> | null = null;

  config = {
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right'
  }
  configService:any= {
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right'
  }
  constructor(
    public silverService: SilverMirrorService,private modalService: MdbModalService
) { }

ngOnInit() {
  this.silverService.cartDetail();
}
activeButton=0;
guestSelect(event:number,guestID:any){
  this.activeButton = event;
  this.silverService.guestID=guestID;
  this.silverService.guestName="Guest"+event;
}
serviceName(service:any){
 return service.replace('Facials ','')

}
createRange(){
  let noofguest=this.silverService.noOfGuest;
  console.log("noofguest",noofguest);
  return new Array(noofguest).fill(0)
    .map((n, index) => index + 1);
}
guestList(){
  this.silverService.guestList$.subscribe((res: any) => {
    console.log("mmm",res);
    });
}

openModal() {
  this.modalRef = this.modalService.open(ModalComponent, this.config);
}

serviceDetail(servicedtl:any) {
  this.configService.data.service=servicedtl;
  this.modalRefService = this.modalService.open(ServiceDetailModelComponent, this.configService);
}

addToCart(elem: any){
  console.log("ADDCART CONDITION",this.silverService.cartDetails$.value);
  this.silverService.addItemInCart(elem.id);
  this.modalRef = this.modalService.open(ModalComponent, this.config);
  elem.active=!elem.active;
}

}