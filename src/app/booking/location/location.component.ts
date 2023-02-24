import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Notification, NotificationService } from "src/app/notification.service";
import { SharedService } from "src/app/shared-component/shared.service";
import { BookingService } from "../booking.service";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent {

  currentIndex: any;
  isActive = false;

  constructor(public authService:AuthService, public bookingService:BookingService, private notificationService:NotificationService, public sharedService:SharedService, private router:Router) {
    this.getLocations();
  }

  getLocations(){
    if(!this.bookingService.locationList$.value.length){
      this.bookingService.getLocations().subscribe((res: any) => {
        if(!res.errors){
          this.bookingService.locationList$.next(res.data.locations.edges);
        }else{
          this.sharedService.showNotification("Error", res.errors[0].message);
        }
      });
    }
  }
  
  expand(index: any) {
    if (this.currentIndex === index) {
      this.currentIndex = null;
      return;
    }
    this.currentIndex = index;
  }
  
  locationSelected(id: any) {
    const location = this.sharedService.getLocalStorageItem("selectedLocation");
    return location && location == id ? "active" : '';
  }

  selectLocation(id:any){
    const locationId = this.sharedService.getLocalStorageItem('selectedLocation');
    console.log("ID",id);
    const cartId = this.sharedService.getLocalStorageItem('cartId');
    if(locationId == id && cartId){
      this.router.navigateByUrl('/booking/whoscoming');
    }else{
      this.bookingService.createCart(id).subscribe((res:any)=>{
        if(!res.errors){
          this.sharedService.setLocalStorageItem('selectedLocation', id);
          this.sharedService.setLocalStorageItem('cartId', res.data.createCart.cart.id);
          this.router.navigateByUrl('/booking/whoscoming');
          this.bookingService.updateCartDetail();
        }else{
          this.sharedService.showNotification("Error", res.errors[0].message);
        }
      });
    }
  }
}
