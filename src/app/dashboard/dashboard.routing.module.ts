import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { AccountComponent } from "./account/account.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { DashboardComponent } from "./dashboard.component";
import { MembershipsComponent } from "./memberships/memberships.component";
import { RescheduleComponent } from "./reschedule/reschedule.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "dashboard",
        component: DashboardComponent,
        children: [
          {
            path: "appointments",
            component: AppointmentComponent,
          },
          {
            path: "reschedule",
            component: RescheduleComponent,
          },
          {
            path: "memberships",
            component: MembershipsComponent,
          },
          {
            path: "account",
            component: AccountComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
