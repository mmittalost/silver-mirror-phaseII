import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/shared-component/shared.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-appointment-tile',
  templateUrl: './appointment-tile.component.html',
  styleUrls: ['./appointment-tile.component.scss']
})
export class AppointmentTileComponent {

  @Input() appointment:any;
  toggleMobileList:boolean = false;

  constructor(private dashboardService: DashboardService, private router:Router, private sharedService:SharedService){}

  cancelAppointment(){
    if(this.appointment?.cancellable){
      this.dashboardService.cancelAppointment(this.appointment.id).subscribe((res:any)=>{
        if(!res.errors){
          this.updateAppointments();
        }else{
          alert(res.errors[0].message);
        }
      })
    }else{
      const title = 'Appointments canceled within 24 hours are subject to 50% service fee.';
      const message = 'Please call our team to move forward with cancellation.';
      this.sharedService.showNotification(title, message); 
    }
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

    navigateToReschedule(){
      const params:any = {
        state:{
          appointmentId:this.appointment.id
        }
      }
      console.log(params);
      this.router.navigateByUrl('/dashboard/reschedule', params)
    }

}
