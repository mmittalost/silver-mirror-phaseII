import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServicesComponent } from "./services/services.component";
import { LocationComponent } from "./location/location.component";
import { WhosComingComponent } from "./whos-coming/whos-coming.component";
import { SchedulingComponent } from "./scheduling/scheduling.component";
import { ReviewComponent } from "./review/review.component";
import { CongratsComponent } from "./congrats/congrats.component";

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
          },
          {
            path: "services",
            component: ServicesComponent,
          },
          {
            path: "schedule",
            component: SchedulingComponent,
          },
          {
            path: "review",
            component: ReviewComponent,
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
