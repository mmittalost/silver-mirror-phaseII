import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SilverMirrorService } from '../silver-mirror.service';
@Component({
  selector: 'app-service-detail-model',
  templateUrl: './service-detail-model.component.html',
  styleUrls: ['./service-detail-model.component.scss']
})
export class ServiceDetailModelComponent {
  @Input() service:any;
  constructor(public modalRefService: MdbModalRef<ServiceDetailModelComponent>,public silverService:SilverMirrorService) {
    console.log("this.modalRefService",this.modalRefService);
   
    setTimeout(() => {
      console.log("this.modalRefServicedata",this.service);
  }, 1000);
    
  }
}
