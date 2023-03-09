import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  cacheMonths:any = [];

  minValue: number = 9;
  maxValue: number = 21;
  options: Options = {
    floor: 9,
    ceil: 21,
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
    this.cart ? this.removeStaff() : null;
  }

  constructor(private bookingService: BookingService, private router:Router, public sharedService:SharedService, private authService:AuthService){}
  
  getStaffVariantByServiceId(serviceId:string){
    this.cart.map((cart:any)=>{
      const service = cart.availableItems.filter((item:any)=>item.id == serviceId);
      service.length ? this.staffVarients.next(service[0].staffVariants) : null;
      return;
    })
  }

  getBookableDates(){
    const locationId = this.cart.location.id;
    let currentMonth = this.calendarComponent?.currentMonth;
    let indexOfCacheMonth = this.cacheMonths?.length ? this.cacheMonths.findIndex((cache:any)=> cache?.isSame(currentMonth)) : -1;
    if(indexOfCacheMonth == -1){
      let lowerRange = moment(currentMonth).startOf('month').format('YYYY-MM-DD');
      let upperRange = moment(currentMonth).endOf('month').format('YYYY-MM-DD');
      this.bookingService.getScheduleDates(locationId, lowerRange, upperRange).subscribe((res:any)=>{
        if(!res.errors){
          const cacheAvailableDates = this.availableDates.value;
          this.cacheMonths.push(currentMonth);
          this.availableDates.next([...res.data.cartBookableDates, ...cacheAvailableDates]);
        }else{
          alert(res.errors[0].message);
        }
      })
    }
  }

  monthChange(ev:any){
    this.getBookableDates();
  }

  selectDate(ev:any){
    this.selectedDate = ev;
    this.bookingService.getScheduleTimes(ev.fullDate).subscribe((res:any)=>{
      if(!res.errors){
        this.availableTimes.next(res.data.cartBookableTimes);
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
  }

  removeStaff(){
    return new Promise((resolve, reject)=>{
      const itemId:string = this.selectedItems.length ? this.selectedItems[0].id : "";
      this.bookingService.updateItemInCart(itemId, null).subscribe((res:any)=>{
        if(!res.errors){
          resolve(true);
        }else{
          reject();
          alert(res.errors[0].message);
        }
      })
    });
  }

  reserveCart(){
    window.scrollTo(0, 0);
    const bookableTimeId = this.selectedTime?.id;
    if(bookableTimeId){
      const itemId:string = this.selectedItems.length ? this.selectedItems[0].id : "";
      if(this.selectedStaff?.id){
        this.bookingService.updateItemInCart(itemId, this.selectedStaff.id).subscribe((res:any)=>{
          if(!res.errors){
            this.bookingService.reserveCartItems(bookableTimeId).subscribe((res:any)=>{
              if(!res.errors){
                this.router.navigateByUrl('booking/review');
              }
            })
          }else{
            alert(res.errors[0].message);
          }
        });
      }else{
        this.bookingService.reserveCartItems(bookableTimeId).subscribe((res:any)=>{
          if(!res.errors){
            this.router.navigateByUrl('booking/review');
          }
        })
      }
    }else{
      const title = 'Appointment time not selected';
      const message = 'Please choose an appointment time.';
      this.sharedService.showNotification(title, message);
    }
  }

  filterStaff(staff:any){
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
