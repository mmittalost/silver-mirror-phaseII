import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService:DashboardService){}

  ngOnInit(): void {
    this.dashboardService.getServices();
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
