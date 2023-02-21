import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-service-notification',
  templateUrl: './service-notification.component.html',
  styleUrls: ['./service-notification.component.scss']
})
export class ServiceNotificationComponent {
  constructor(public modalRef: MdbModalRef<ServiceNotificationComponent>) {}

}
