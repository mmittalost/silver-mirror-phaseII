import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/shared-component/shared.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  cancel:boolean = false;

  constructor(public dashboardService: DashboardService, private sharedService:SharedService){
    this.getAppointments();
  }

  getAppointments(){
    this.dashboardService.getAppointmentsList().subscribe((res:any)=>{
      if(!res.errors){
        this.dashboardService.$myAppointments.next(res.data.myAppointments.edges);
      }else{
        const title = 'Something went wrong';
        const message = res.errors[0].message;
        this.sharedService.showNotification(title, message);
      }
    })
  }

}
