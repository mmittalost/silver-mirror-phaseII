import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './dashboard/appointment/appointment.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { PastAppointmentsPipe, UpcomingAppointmentsPipe } from './dashboard/appointments.pipe';
import { AccountComponent } from './dashboard/account/account.component';
import { MembershipsComponent } from './dashboard/memberships/memberships.component';
import { FilterMembershipPipe, MembershipServicesPipe } from './dashboard/memberships/filter-membership.pipe';
import { MembershipProductsComponent } from './dashboard/membership-products/membership-products.component';
import { AppointmentTileComponent } from './dashboard/appointment/appointment-tile/appointment-tile.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { ServiceNotificationComponent } from './service-notification/service-notification.component';
import { ServiceAddonNotificationComponent } from './service-addon-notification/service-addon-notification.component';
import { RescheduleComponent } from './dashboard/reschedule/reschedule.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedComponentModule } from './shared-component/shared-component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlertComponent } from './shared-component/alert/alert.component';
import { BookingModule } from './booking/booking.module';
@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    DashboardHeaderComponent,
    PastAppointmentsPipe,
    UpcomingAppointmentsPipe,
    AccountComponent,
    MembershipsComponent,
    FilterMembershipPipe,
    MembershipServicesPipe,
    MembershipProductsComponent,
    AppointmentTileComponent,
    ServiceNotificationComponent,
    ServiceAddonNotificationComponent,
    RescheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    MdbCheckboxModule,
    MdbModalModule,
    CommonModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    DashboardModule,
    BookingModule,
    SharedComponentModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastComponent: AlertComponent,
      positionClass:'toast-top-right',
      tapToDismiss:true,
    }),
  ],
  exports:[ SharedComponentModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
