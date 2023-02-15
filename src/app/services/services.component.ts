import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';
import { ModalComponent  } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';




@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  facialName = "Facials 30 Minutes";
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    public silverService: SilverMirrorService,private modalService: MdbModalService
) { }
ngOnInit() {
  this.silverService.cartDetail()
  
}
openModal() {
  this.modalRef = this.modalService.open(ModalComponent)
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