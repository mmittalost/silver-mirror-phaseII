import { Component, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  appointmentId:string = 'urn:blvd:Appointment:b9f27937-a338-4430-92b2-e090af79780e';

  constructor(public dashboardService: DashboardService){
    this.getAppointments();
  }

  getAppointments(){
    this.dashboardService.getAppointmentsList().subscribe((res:any)=>{
      if(!res.errors){
        this.dashboardService.$myAppointments.next(res.data.myAppointments.edges);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

}
