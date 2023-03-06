import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService:DashboardService, public router: Router){
    this.dashboardService.getServices();
  }

  ngOnInit(): void { }

  getClientName(){
    return this.dashboardService.authUser.firstName;
  }

}
