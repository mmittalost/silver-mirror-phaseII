import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { LoginComponent } from "./auth/login/login.component";
// import { RegisterComponent } from "./auth/register/register.component";
// import { LocationComponent } from "./_location/location.component";
// import { WhosComingComponent } from "./_whos-coming/whos-coming.component";
// import { ServicesComponent } from "./services/services.component";
// import { SchedulingComponent } from "./_scheduling/scheduling.component";
// import { ReviewComponent } from "./_review/review.component";
// import { CongratsComponent } from "./congrats/congrats.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      // { path: "login", component: LoginComponent },
      // { path: "register", component: RegisterComponent },
      // { path: "location", component: LocationComponent },
      // { path: "whoscoming", component: WhosComingComponent },
      // { path: "services", component: ServicesComponent },
      // { path: "scheduling", component: SchedulingComponent },
      // { path: "review", component: ReviewComponent },
      // { path: "congrats", component: CongratsComponent },
      { path: "", redirectTo: "/booking", pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
