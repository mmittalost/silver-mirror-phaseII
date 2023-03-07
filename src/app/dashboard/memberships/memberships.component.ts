import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/shared-component/shared.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
})
export class MembershipsComponent {

  $memberships:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private dashboardService:DashboardService, private router:Router, private sharedService:SharedService){
    this.getMembershipsList();
  }

  getMembershipsList(){
    this.dashboardService.myMembershipsList().subscribe((res:any)=>{
      if(!res.errors){
        this.$memberships.next(res.data.myMemberships.edges);
        if(!this.$memberships.value.length){
          this.router.navigateByUrl("/dashboard/membership-products");
        }
      }else{
        const title = 'Something went wrong';
        const message = res.errors[0].message;
        this.sharedService.showNotification(title, message);
      }
    })
  }

}
