import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from 'src/app/shared-component/shared.service';
import { BookingService } from '../../booking.service';
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ModalServiceDetailComponent } from './modal-service-detail/modal-service-detail.component';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent {

  @Input() services:any;
  @Input() client:any;
  @Output() addServiceEvent = new EventEmitter<string>();

  serviceDetailModalRef!: MdbModalRef<ModalServiceDetailComponent> | null;

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

  addService(service:any){
      this.addServiceEvent.emit(service); 
  }

  serviceDetail(service: any) {
    service.category = this.services[0].name;
    this.modalConfig.data.service = service;
    this.modalConfig.data.client = this.client;
    this.serviceDetailModalRef = this.modalService.open(
      ModalServiceDetailComponent,
      this.modalConfig
    );
  }

}
