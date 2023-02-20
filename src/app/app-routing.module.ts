import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LocationComponent } from "./location/location.component";
import { WhosComingComponent } from "./whos-coming/whos-coming.component";
import { ServicesComponent } from "./services/services.component";
import { SchedulingComponent } from "./scheduling/scheduling.component";
import { ReviewComponent } from "./review/review.component";
import { CongratsComponent } from "./congrats/congrats.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { AppointmentComponent } from "./dashboard/appointment/appointment.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "location", component: LocationComponent },
      { path: "whoscoming", component: WhosComingComponent },
      { path: "services", component: ServicesComponent },
      { path: "scheduling", component: SchedulingComponent },
      { path: "review", component: ReviewComponent },
      { path: "congrats", component: CongratsComponent },
      { path: "", redirectTo: "/location", pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
