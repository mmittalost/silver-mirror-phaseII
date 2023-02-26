import { Component, Input } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SharedService } from 'src/app/shared-component/shared.service';
import { BookingService } from '../../booking.service';
import { ModalAddonDetailComponent } from './modal-addon-detail/modal-addon-detail.component';

@Component({
  selector: 'app-addons-list',
  templateUrl: './addons-list.component.html',
  styleUrls: ['./addons-list.component.scss']
})
export class AddonsListComponent {

  @Input() cart:any;
  @Input() client:any;

  serviceDetailModalRef!: MdbModalRef<ModalAddonDetailComponent> | null;
  modalConfig: any = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  }; 

  constructor(public sharedService:SharedService, private bookingService:BookingService, private modalService: MdbModalService){}

  addModifier(modifier:any){
    let selectedItems:any = this.cart.selectedItems.filter((selectedItem:any)=>{
      return selectedItem.guestId == this.client.id;
    })
    console.log("SELECTED ITEMS : ", selectedItems);
    let optionIds:Array<string | null> = this.getSelectedModifiers(selectedItems);
    console.log(selectedItems, optionIds);
    let index = optionIds.indexOf(modifier.id);
    if(index < 0){
      const payload = {
        id: selectedItems[0].id,
        optionIds: [...optionIds, modifier.id],
        staffId:null,
        guestId: this.client != 'me' ? this.client.id : null
      }
      this.bookingService.addAddonInCart(payload).subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Great Choice! Looking gorgeous';
          const message = 'ADDED TO CART';
          this.sharedService.showNotification(title, message);
          this.bookingService.updateCartDetail();
        }else{
          this.sharedService.showNotification('Errors', res.errors[0].message);
        }
      });
    }else{
      const title = 'Addon already added';
      const message = 'please choose another addon to add in cart.';
      this.sharedService.showNotification(title, message);
    }
  }

  getSelectedModifiers(selectedItems:any):Array<string | null>{
    if(selectedItems.length && selectedItems[0].selectedOptions && selectedItems[0].selectedOptions.length){
      const ids = selectedItems[0].selectedOptions.map((option:any)=> option.id);
      console.log('Selected options : ', ids);
      return ids;
    }else{
      return []
    }
  }

  addonDetail(addon: any) {
    this.modalConfig.data.addon = addon;
    this.modalConfig.data.client = this.client;
    this.serviceDetailModalRef = this.modalService.open(
      ModalAddonDetailComponent,
      this.modalConfig
    );
  }

}
