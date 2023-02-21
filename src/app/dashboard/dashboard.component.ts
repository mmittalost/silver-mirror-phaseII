import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService:DashboardService){
    this.dashboardService.getServices();
  }

  ngOnInit(): void { }

  getClientName(){
    return this.dashboardService.authUser.firstName;
  }

}
