import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import * as moment from "moment";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/shared-component/shared.service';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {

  appointmentId:BehaviorSubject<string> = new BehaviorSubject('');
  availableDates:BehaviorSubject<any> = new BehaviorSubject([]);
  availableTimes:BehaviorSubject<any> = new BehaviorSubject([]);
  selectedTime:any;
  selectedDate:any;

  ngOnInit(){
    this.appointmentId.next(history.state.appointmentId);
  }
  
  constructor(private dashboardService:DashboardService, private router:Router, public sharedService:SharedService){
    this.appointmentId.subscribe((aptId:string)=>{
      if(aptId != ''){
        const lowerRange = moment().format('YYYY-MM-DD');
        const upperRange = moment().endOf('month').format('YYYY-MM-DD');
        this.getRescheduleDates(lowerRange, upperRange);
      }
    });
  }

  getRescheduleDates(lowerRange:string, upperRange:string){
    setTimeout(() => {
      this.dashboardService.getRescheduleDates(this.appointmentId.value, lowerRange, upperRange).subscribe((res:any)=>{
        if(!res.errors){
          this.availableDates.next(res.data.AppointmentRescheduleAvailableDates.availableDates);
        }else{
          const title = 'Something went wrong';
          const message = res.errors[0].message;
          this.sharedService.showNotification(title, message);
        }
      });
    }, 1000);
  }

  monthChange(ev:any){
    const lowerRange = ev.startOf('month').format('YYYY-MM-DD');
    const upperRange = ev.endOf('month').format('YYYY-MM-DD');
    this.getRescheduleDates(lowerRange, upperRange);
  }

  selectDate(ev:any){
    this.selectedDate = ev;
    this.dashboardService.getRescheduleTimes(this.appointmentId.value, ev.fullDate).subscribe((res:any)=>{
      if(!res.errors){
        this.availableTimes.next(res.data.appointmentRescheduleAvailableTimes.availableTimes);
      }else{
        const title = 'Something went wrong';
        const message = res.errors[0].message;
        this.sharedService.showNotification(title, message);
      }
    });
  }

  selectTime(time:any){
    time.selected = !time.selected;
    this.selectedTime = time;
  }

  reschedule(){
    if(this.selectedTime){
      this.dashboardService.reschedule(this.appointmentId.value, this.selectedTime.bookableTimeId).subscribe((res:any)=>{
        if(!res.errors){
          this.router.navigateByUrl('/dashboard/appointments');
        }else{
          const title = 'Something went wrong';
          const message = res.errors[0].message;
          this.sharedService.showNotification(title, message);
        }
      });
    }else{
      const title = 'Choose appointment time';
      const message = "Please select the appointment time.";
      this.sharedService.showNotification(title, message);
    }
  }

}
