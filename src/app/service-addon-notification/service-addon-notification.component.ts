import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-service-addon-notification',
  templateUrl: './service-addon-notification.component.html',
  styleUrls: ['./service-addon-notification.component.scss']
})
export class ServiceAddonNotificationComponent {
  constructor(public modalRef: MdbModalRef<ServiceAddonNotificationComponent>) {}
}
