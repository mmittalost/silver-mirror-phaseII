import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss']
})
export class ConfirmationAlertComponent {

  @Input() message:string = 'Are you sure, You do not want to add ADD-ON ?';
  @Output() closeEvent = new EventEmitter<string>();
  @Output() continueEvent = new EventEmitter<string>();

  constructor(public confirmationModalRef: MdbModalRef<ConfirmationAlertComponent>, private modalService: MdbModalService){}

  close(){
    this.confirmationModalRef.close(false);
  }

  continue(){
    this.confirmationModalRef.close(true);
  }

}
