import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Notification, NotificationService } from '../notification.service';
import { SilverMirrorService } from '../silver-mirror.service';
import { Options, ChangeContext, PointerType } from '@angular-slider/ngx-slider';
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
  selectedItems:any = [];
  toggleTimeFilter:boolean = false;
  toggleStaffFilter:boolean = false;

  minValue: number = 9;
  maxValue: number = 20;
  options: Options = {
    floor: 9,
    ceil: 20,
    step:1,
    noSwitching: true,
    translate: (value: number): string => {
      if(value >= 9 && value <=12){
        return value + 'AM';
      }else{
        return (value - 12) + 'PM'
      }
    }
  };

  ngOnInit(): void {
    this.silverService.cartDetail();
    this.bookingService.cartDetail$.subscribe((detail:any)=>{
      console.log("Cart Detail : ", detail);
      if(detail.length){
        this.cartDetail = detail;
        // this.getStaffVariantByServiceId("urn:blvd:Service:09ac1b50-2dc7-47d5-ac30-c1a0f523cbdc");
      }
    });
    this.bookingService.cartDetails$.subscribe((detail:any)=>{
      if(detail.length){
        this.selectedItems = detail;
        this.ifStaffVariantSelected();
      }
    });
    this.getBookableDates();
  }

  constructor(private bookingService: SilverMirrorService,public silverService:SilverMirrorService, private router:Router, private notificationService:NotificationService){}

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

  ifStaffVariantSelected(){
    const selectedStaff = this.selectedItems.length && this.selectedItems[0].selectedStaffVariant? this.selectedItems[0]?.selectedStaffVariant?.staff : null;
    console.log('Selected Staff',selectedStaff);
    const staffVariants = this.staffVarients.value;
    console.log('this.staff', staffVariants);
    staffVariants.map((variant:any)=> {
      if(variant.staff.id == selectedStaff.id){
        variant.selected = true;
      }
    })
    this.staffVarients.next(staffVariants);
    console.log('this.staff', this.staffVarients.value);
  }

  getBookableDates(){
    const cartId:any = localStorage.getItem('cartID');
    const locationId = this.bookingService.location$.value.id;
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
    this.getBookableDates();
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
    const serviceId:string = this.selectedItems[0].id;
    const locationId = this.bookingService.location$.value.id;
    this.bookingService.getCartStaffVarients(cartId, time.id, serviceId, locationId).subscribe((res:any)=>{
      if(!res.errors){
        this.staffVarients.next(res.data.cartBookableStaffVariants);
        this.ifStaffVariantSelected();
        console.log(this.staffVarients.value);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  selectStaff(staff:any){
    staff.selected = !staff.selected;
    this.selectedStaff = staff;
    const itemId:string = this.selectedItems.length ? this.selectedItems[0].id : "";

    console.log("Selected Items : ", this.selectedItems);
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

  reserveCart(){
    const bookableTimeId = this.selectedTime.id;
    this.silverService.reserveCartItems(bookableTimeId).subscribe((res:any)=>{
      if(!res.errors){
        this.router.navigateByUrl('/review');
      }else{
        const notification:Notification = {
          title:"Error",
          message:res.errors[0].message
        }
        this.notificationService.$notification.next(notification);
      }
    })
  }

  filterStaff(staff:any){
    console.log(staff);
    staff.filter = !staff.filter;
  }

  changeTimeRange(changeContext: ChangeContext): void {
    // const min = changeContext.value;
    // const max = changeContext.highValue;
    // const date = new Date()
  }

}
