import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAnAppointmentComponent } from './book-an-appointment/book-an-appointment.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LocationComponent } from './location/location.component';
import { WhosComingComponent } from './whos-coming/whos-coming.component';
import { ServicesComponent } from './services/services.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ReviewComponent } from './review/review.component';
import { CongratsComponent } from './congrats/congrats.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LocationGroupPipe } from './location-group.pipe';
import { FacialFilterPipe } from './facial-filter.pipe';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ServiceDetailModelComponent } from './service-detail-model/service-detail-model.component';
import { CartComponent } from './cart/cart.component';
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
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TimeFilterPipe } from './scheduling/time-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    BookAnAppointmentComponent,
    BreadcrumbsComponent,
    LocationComponent,
    WhosComingComponent,
    ServicesComponent,
    SchedulingComponent,
    ReviewComponent,
    CongratsComponent,
    LocationGroupPipe,
    FacialFilterPipe,
    ServiceDetailModelComponent,
    CartComponent,
    ModalComponent,
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
    TimeFilterPipe,
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
    SharedComponentModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastComponent: AlertComponent,
      // autoDismiss: true,
      positionClass:'toast-top-right',
      tapToDismiss:true,
    }),
    NgxSliderModule,
  ],
  exports:[ SharedComponentModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
