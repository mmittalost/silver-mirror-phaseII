import { Component, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {

  @Input() appointment:any;

  constructor(private dashboardService: DashboardService){ }

   cancelAppointment(){
    this.dashboardService.cancelAppointment(this.appointment.id).subscribe((res:any)=>{
      if(!res.errors){
        this.updateAppointments();
      }else{
        alert(res.errors[0].message);
      }
    })
   }

   updateAppointments(){
    this.dashboardService.getAppointmentsList().subscribe((res:any)=>{
      if(!res.errors){
        this.dashboardService.$myAppointments.next(res.data.myAppointments.edges);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

}
