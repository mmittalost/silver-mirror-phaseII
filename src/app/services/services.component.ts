import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import{ModalComponent} from '../modal/modal.component'


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  facialName = "Facials 30 Minutes";
  modalRef: MdbModalRef<ModalComponent> | null = null;

  config = {
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      title: 'Custom title'
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right'
  }
  constructor(
    public silverService: SilverMirrorService,private modalService: MdbModalService
) { }
openModal() {
  this.modalRef = this.modalService.open(ModalComponent, this.config);
}
ngOnInit() {
  this.silverService.cartDetail()
  
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
    console.log("mmm",res[0]);
    });
}


}