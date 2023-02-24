import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SharedService } from 'src/app/shared-component/shared.service';

@Component({
  selector: 'app-modal-addons',
  templateUrl: './modal-addons.component.html',
  styleUrls: ['./modal-addons.component.scss']
})
export class ModalAddonsComponent {

  @Input() selectedItem:any = [];

  constructor(public sharedService:SharedService, public addonModalRef: MdbModalRef<ModalAddonsComponent>){
    setTimeout(() => {
      console.log(this.selectedItem);
    }, 1000);
  }

}
