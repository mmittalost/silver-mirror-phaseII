import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
})
export class MembershipsComponent {

  $memberships:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private dashboardService:DashboardService){
    this.getMembershipsList();
  }

  getMembershipsList(){
    this.dashboardService.myMembershipsList().subscribe((res:any)=>{
      if(!res.errors){
        this.$memberships.next(res.data.myMemberships.edges);
        console.log(this.$memberships.value);
      }else{
        alert(res.errors[0].message);
      }
    })
  }

}
