import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  addonName:any='';
  
  constructor(public modalRef: MdbModalRef<ModalComponent>,public silverService: SilverMirrorService) {}
  addonSelected(modifier:any){
    if(modifier.selected==true)
    {
      this.silverService.selectedAddonsId.delete(modifier.id);
      modifier.selected=false;
    }else
    {
      this.silverService.selectedAddonsId.add(modifier.id);
      modifier.selected=true;
    }
    console.log("selectedAddonsId",this.silverService.selectedAddonsId);
  }
}