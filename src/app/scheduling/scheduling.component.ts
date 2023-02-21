import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {

  availableDates:BehaviorSubject<any> = new BehaviorSubject([]);
  availableTimes:BehaviorSubject<any> = new BehaviorSubject([]);
  staffVarients:BehaviorSubject<any> = new BehaviorSubject([]);
  selectedTime:any;
  selectedStaff:any;
  cartDetail:any = [];

  ngOnInit(): void {
    this.bookingService.cartDetail$.subscribe((detail:any)=>{
      console.log("Cart Detail : ", detail);
      if(detail.length){
        this.cartDetail = detail;
        this.getStaffVariantByServiceId("urn:blvd:Service:09ac1b50-2dc7-47d5-ac30-c1a0f523cbdc");
      }
    });
    this.getBookableDates();
  }

  constructor(private bookingService: SilverMirrorService){}

  getStaffVariantByServiceId(serviceId:string){
    console.log("Filter Staff Variants");
    this.cartDetail.map((detail:any)=>{
      const service = detail.availableItems.filter((item:any)=>item.id == serviceId);
      console.log("Service Found : ", service);
      service.length ? this.staffVarients.next(service[0].staffVariants) : null;
      return;
    })
    console.log("this.staffVariants : ", this.staffVarients.value);
  }

  getBookableDates(){
    const cartId:any = localStorage.getItem('cartID');
    const locationId = "urn:blvd:Location:24a2fac0-deef-4f7f-8bf6-52368be42d65";
    this.bookingService.getScheduleDates(cartId, locationId).subscribe((res:any)=>{
      if(!res.errors){
        this.availableDates.next(res.data.cartBookableDates);
        console.log(this.availableDates.value);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  monthChange(ev:any){
    console.log("Month Change : ", ev);
  }

  selectDate(ev:any){
    console.log("Select Date : ", ev);
    const cartId:any = localStorage.getItem('cartID');
    this.bookingService.getScheduleTimes(cartId, ev.fullDate).subscribe((res:any)=>{
      if(!res.errors){
        this.availableTimes.next(res.data.cartBookableTimes);
        console.log(this.availableTimes.value);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  selectTime(time:any){
    time.selected = !time.selected;
    this.selectedTime = time;
    const cartId:any = localStorage.getItem('cartID');
    const serviceId:string = "urn:blvd:Service:09ac1b50-2dc7-47d5-ac30-c1a0f523cbdc";
    const locationId = "urn:blvd:Location:24a2fac0-deef-4f7f-8bf6-52368be42d65";
    this.bookingService.getCartStaffVarients(cartId, time.id, serviceId, locationId).subscribe((res:any)=>{
      if(!res.errors){
        this.staffVarients.next(res.data);
        console.log(this.staffVarients.value);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  selectStaff(staff:any){
    staff.selected = !staff.selected;
    this.selectedStaff = staff;
    const itemId:string = "urn:blvd:Service:2c3ef44d-341d-4a15-8f9e-28e3e6022c9c";
    const locationId = "urn:blvd:Location:24a2fac0-deef-4f7f-8bf6-52368be42d65";
    this.bookingService.updateItemInCart(itemId, this.selectedStaff.id).subscribe((res:any)=>{
      if(!res.errors){
        console.log(res);
        this.bookingService.cartDetail();
        this.getBookableDates();
      }else{
        alert(res.errors[0].message);
      }
    })
  }

}
