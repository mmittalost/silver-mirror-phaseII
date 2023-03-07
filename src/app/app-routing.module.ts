import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", redirectTo: "/booking/location", pathMatch:'full' },
    ],{ useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
