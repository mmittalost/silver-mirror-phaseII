import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../notification.service';
import { Options, ChangeContext } from '@angular-slider/ngx-slider';
import { BookingService } from '../booking.service';
import { SharedService } from 'src/app/shared-component/shared.service';
import { CalendarComponent } from "../../shared-component/calendar/calendar.component";
import * as moment from "moment";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {

  cart:any;
  @ViewChild(CalendarComponent) calendarComponent:any;

  availableDates:BehaviorSubject<any> = new BehaviorSubject([]);
  availableTimes:BehaviorSubject<any> = new BehaviorSubject([]);
  staffVarients:BehaviorSubject<any> = new BehaviorSubject([]);
  selectedTime:any;
  selectedDate:any;
  selectedStaff:any;
  // cartDetail:any = [];
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
    if(this.authService.$AuthUser.value){
      this.bookingService.takeCartOwnership().subscribe((res:any)=>{
        if(!res.errors){
          this.bookingService.updateCartDetail();
        }
      });
    }
    this.bookingService.updateCartDetail();
    // this.getBookableDates();
    this.bookingService.clientCart$.subscribe((cart)=>{
      if(cart && cart.id){
        this.cart = cart;
        this.selectedItems = cart.selectedItems;
        // this.ifStaffVariantSelected();
        this.getBookableDates(); // it is making extra request need to fix it.
      }
    })
    // this.bookingService.cartDetail$.subscribe((detail:any)=>{
    //   console.log("Cart Detail : ", detail);
    //   if(detail.length){
    //     this.cartDetail = detail;
    //     // this.getStaffVariantByServiceId("urn:blvd:Service:09ac1b50-2dc7-47d5-ac30-c1a0f523cbdc");
    //   }
    // });
    // this.bookingService.cartDetails$.subscribe((detail:any)=>{
    //   if(detail.length){
    //     this.selectedItems = detail;
    //     this.ifStaffVariantSelected();
    //   }
    // });
  }

  constructor(private bookingService: BookingService, private router:Router, private sharedService:SharedService, private authService:AuthService){}

  getStaffVariantByServiceId(serviceId:string){
    console.log("Filter Staff Variants");
    this.cart.map((cart:any)=>{
      const service = cart.availableItems.filter((item:any)=>item.id == serviceId);
      console.log("Service Found : ", service);
      service.length ? this.staffVarients.next(service[0].staffVariants) : null;
      return;
    })
    console.log("this.staffVariants : ", this.staffVarients.value);
  }

  // ifStaffVariantSelected(){
  //   const selectedStaff = this.selectedItems.length && this.selectedItems[0].selectedStaffVariant? this.selectedItems[0]?.selectedStaffVariant?.staff : null;
  //   console.log('Selected Staff',selectedStaff);
  //   const staffVariants = this.staffVarients.value;
  //   console.log('this.staff', staffVariants);
  //   if(selectedStaff){
  //     staffVariants.map((variant:any)=> {
  //       if(variant.staff.id == selectedStaff.id){
  //         variant.selected = true;
  //       }
  //     })
  //   }
  //   this.staffVarients.next(staffVariants);
  //   console.log('this.staff', this.staffVarients.value);
  // }

  getBookableDates(){
    const locationId = this.cart.location.id;
    console.log('Calendar Component : ', this.calendarComponent);
    let currentMonth = this.calendarComponent.currentMonth;
    let lowerRange = moment(currentMonth).startOf('month').format('YYYY-MM-DD');
    let upperRange = moment(currentMonth).endOf('month').format('YYYY-MM-DD');
    this.bookingService.getScheduleDates(locationId, lowerRange, upperRange).subscribe((res:any)=>{
      if(!res.errors){
        this.availableDates.next(res.data.cartBookableDates);
        console.log('available Dates : ', this.availableDates.value);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  monthChange(ev:any){
    this.getBookableDates();
    // console.log("Month Change : ", ev);
  }

  selectDate(ev:any){
    this.selectedDate = ev;
    this.bookingService.getScheduleTimes(ev.fullDate).subscribe((res:any)=>{
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
    const serviceId:string = this.selectedItems[0].id;
    const locationId = this.cart.location.id;
    this.bookingService.getCartStaffVarients(time.id, serviceId, locationId).subscribe((res:any)=>{
      if(!res.errors){
        this.staffVarients.next(res.data.cartBookableStaffVariants);
        // this.ifStaffVariantSelected();
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
        this.bookingService.updateCartDetail();
        // this.getBookableDates();
      }else{
        alert(res.errors[0].message);
      }
    })
  }

  reserveCart(){
    window.scrollTo(0, 0);
    const bookableTimeId = this.selectedTime?.id;
    if(bookableTimeId){
      this.bookingService.reserveCartItems(bookableTimeId).subscribe((res:any)=>{
        if(!res.errors){
          this.router.navigateByUrl('booking/review');
        }else{
          console.log(res.errors);
        }
      })
    }else{
      const title = 'Appointment time not selected';
      const message = 'Please choose an appointment time.';
      this.sharedService.showNotification(title, message);
    }
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

  clearStaffFilter(){
    let staffs = this.staffVarients.value;
    staffs.map((staff:any)=>{
      staff.filter = false;
    });
    this.staffVarients.next(staffs);
  }

  clearTimeFilter(){
    this.minValue = 9;
    this.maxValue = 20;
  }

  closeMobileFilter(){
    this.toggleTimeFilter = false;
    this.toggleStaffFilter = false;
  }

}
