import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServicesComponent } from "./services/services.component";
import { LocationComponent } from "./location/location.component";
import { WhosComingComponent } from "./whos-coming/whos-coming.component";
import { SchedulingComponent } from "./scheduling/scheduling.component";
import { ReviewComponent } from "./review/review.component";
import { CongratsComponent } from "./congrats/congrats.component";
import { LocationGuard } from "../guards/location.guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "booking",
        children: [
          { path: "", redirectTo: "location", pathMatch: 'full' },
          {
            path: "location",
            component: LocationComponent,
          },
          {
            path: "whoscoming",
            component: WhosComingComponent,
            canActivate: [LocationGuard]
          },
          {
            path: "services",
            component: ServicesComponent,
            canActivate: [LocationGuard]
          },
          {
            path: "schedule",
            component: SchedulingComponent,
            canActivate: [LocationGuard]
          },
          {
            path: "review",
            component: ReviewComponent,
            canActivate: [LocationGuard]
          },
          {
            path: "congrats",
            component: CongratsComponent,
          },
        ],
      },
    ], {useHash: true}),
  ],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
