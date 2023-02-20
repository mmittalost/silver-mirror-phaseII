import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import * as moment from "moment";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {

  appointmentId:BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(){
    this.appointmentId.next(history.state.appointmentId);
  }
  
  constructor(private dashboardService:DashboardService, private router:Router){
    this.appointmentId.subscribe((aptId:string)=>{
      if(aptId != ''){
        this.getRescheduleDates();
      }
    });
  }

  getRescheduleDates(){
    let lowerRange = moment().format('YYYY-MM-D');
    let upperRange = moment().endOf('month').format('YYYY-MM-D');
    setTimeout(() => {
      console.log(this.appointmentId);
      this.dashboardService.getRescheduleDates(this.appointmentId.value, lowerRange, upperRange).subscribe((res:any)=>{
        if(!res.errors){
          console.log(res);
        }else{
          alert(res.errors[0].message);
        }
      });
    }, 1000);
  }

}
