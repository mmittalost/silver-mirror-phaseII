import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/booking/booking.service';
import { SharedService } from 'src/app/shared-component/shared.service';

@Component({
  selector: 'app-modal-is-addon-added',
  templateUrl: './modal-is-addon-added.component.html',
  styleUrls: ['./modal-is-addon-added.component.scss']
})
export class ModalIsAddonAddedComponent {

  constructor(public sharedService:SharedService, private bookingService:BookingService, public modalRef: MdbModalRef<ModalIsAddonAddedComponent>){
    
  }

  addAddon(choice:boolean){
    console.log("addon choice : ", choice);
    this.modalRef.close({choice:choice});
  }

}
