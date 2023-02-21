import { Component } from "@angular/core";
import { SilverMirrorService } from "../silver-mirror.service";
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ModalComponent } from "../modal/modal.component";
import { ServiceDetailModelComponent } from "../service-detail-model/service-detail-model.component";
import { ServiceNotificationComponent } from "../service-notification/service-notification.component";
import { ServiceAddonNotificationComponent } from "../service-addon-notification/service-addon-notification.component";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent {
  facialName = "Facials 30 Minutes";
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRefService: MdbModalRef<ServiceDetailModelComponent> | null = null;
  modalRefNotification: MdbModalRef<ServiceNotificationComponent> | null = null;
  modalRefAddonNotification: MdbModalRef<ServiceAddonNotificationComponent> | null = null;
  numberOfGuest: any = localStorage.getItem("selectedWhoscoming");
  selectedTab:any;
  config = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  };
  configService: any = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  }; 

  configNotification: any = {
    animation: true,
    backdrop: true,
    containerClass: "right",
    data: {},
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: "modal-top-right",
  };
  greeting:any=this.silverService.greeting;
  constructor(
    public silverService: SilverMirrorService,
    private modalService: MdbModalService
  ) {

    console.log(this.silverService.greeting);
  }

  ngOnInit() {
    this.silverService.cartDetail();
  }
  activeButton = 0;
  guestSelect(event: number, guestID: any) {
    this.activeButton = event;
    this.silverService.guestID = guestID;
    this.silverService.guestName = "Guest" + event;
    console.log(this.silverService.guestName);
  }
  serviceName(service: any) {
    return service.replace("Facials ", "");
  }

  guestList() {
    this.silverService.guestList$.subscribe((res: any) => {
    });
  }

  openModal() {
    this.silverService.cartDetails$.subscribe((res: any) => { 
     });
     console.log("this.silverService.cartDetail$.value.length",this.silverService.cartDetails$.value.length);
     if(this.silverService.cartDetails$.value.length>0){
      this.modalRef = this.modalService.open(ModalComponent, this.config);
     }else{
      this.serviceAddonNotification();
     }
    
  }
  serviceAddonNotification() {
  console.log("Addon");
    this.modalRef = this.modalService.open(ServiceAddonNotificationComponent, this.config);
  }

  serviceDetail(servicedtl: any) {
    this.configService.data.service = servicedtl;
    this.modalRefService = this.modalService.open(
      ServiceDetailModelComponent,
      this.configService
    );
  }
 
  addToCart(elem: any) {
    this.silverService.selectedServiceID = elem.id;
    if (this.silverService.cartDetails$.value.length == 0) {
      this.silverService.addItemInCart(elem.id);
      this.modalRef = this.modalService.open(ModalComponent, this.config);
      elem.selected=true;
    } else {
      const found = this.silverService.selectedTabWithServices.some((item:any) => item.hasOwnProperty(this.silverService.guestName));
      if (found) {
        elem.selected=false;
        this.modalRefNotification = this.modalService.open(ServiceNotificationComponent,this.config);
      } else {
        elem.selected=true;
        this.silverService.addItemInCart(elem.id);
        this.modalRef = this.modalService.open(ModalComponent, this.config);
      }
    } 
  }

  imageURL(serviceID: any) {
    let imgURL =
      "https://blvd.silvermirror.com/assets/thumb-" + serviceID + ".jpg";
    return imgURL;
  }
  guestCheck(){
    alert("Guest checked!!!");
  }
  selectedService(serviceId:any){
    console.log("this.silverService.selectedTabWithServices",this.silverService.selectedTabWithServices);
    console.log("this.silverService.guestName",this.silverService.guestName);
    //let obj:any;
    const result = this.silverService.selectedTabWithServices.filter((obj: { [x: string]: any; }) => obj[this.silverService.guestName] === serviceId);
    
    console.log("RESULTS", result);
    
    if(result.length!=0){
      return true;
    }else{
      return false;
    }
   
  }
  // if(this.silverService.cartDetails$.value.length==0)
  //{

  // }
  //else{
  //alert ("You can not add more than one services in cart!!!");
  //}
}
