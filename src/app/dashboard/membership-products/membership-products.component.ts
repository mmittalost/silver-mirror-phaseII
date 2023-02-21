import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-membership-products',
  templateUrl: './membership-products.component.html',
  styleUrls: ['./membership-products.component.scss']
})
export class MembershipProductsComponent {
  constructor(private dashboardService:DashboardService){ }
}
