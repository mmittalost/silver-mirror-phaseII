import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-addons',
  templateUrl: './modal-addons.component.html',
  styleUrls: ['./modal-addons.component.scss']
})
export class ModalAddonsComponent {

  constructor(public addonModalRef: MdbModalRef<ModalAddonsComponent>){}

}
