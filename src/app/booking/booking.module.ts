import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking.routing.module';
import { LocationComponent } from './location/location.component';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { LocationGroupPipe } from '../location-group.pipe';
import { WhosComingComponent } from './whos-coming/whos-coming.component';
import { ServicesComponent } from './services/services.component';
import { ServicesTabsComponent } from './services/services-tabs/services-tabs.component';
import { GuestTabsComponent } from './services/guest-tabs/guest-tabs.component';
import { TimeFiltersComponent } from './services/time-filters/time-filters.component';
import { ServicesListComponent } from './services/services-list/services-list.component';
import { FilterServicePipe } from './services/filter-service.pipe';
import { CartComponent } from './cart/cart.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TimeFilterPipe } from './scheduling/time-filter.pipe';
import { ReviewComponent } from './review/review.component';
import { CongratsComponent } from './congrats/congrats.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalServiceDetailComponent } from "./services/services-list/modal-service-detail/modal-service-detail.component";
import { ModalAddonsComponent } from './services/modal-addons/modal-addons.component';
import { AddonsListComponent } from './services/addons-list/addons-list.component';
import { AddonsPipe } from './services/addons-list/addons.pipe';
import { FilterCartItemsPipe } from './cart/filter-cart-items.pipe';
import { OrderGuestTabsPipe } from './services/guest-tabs/order-guest-tabs.pipe';
import { ModalAddonDetailComponent } from './services/addons-list/modal-addon-detail/modal-addon-detail.component';
import { ModalIsAddonAddedComponent } from './services/modal-is-addon-added/modal-is-addon-added.component';

@NgModule({
  declarations: [
    // Page Components
    BookingComponent,
    BreadcrumbsComponent,
    LocationComponent,
    WhosComingComponent,
    ServicesComponent,
    ServicesTabsComponent,
    GuestTabsComponent,
    TimeFiltersComponent,
    ServicesListComponent,
    AddonsListComponent,
    CartComponent,
    SchedulingComponent,
    ReviewComponent,
    CongratsComponent,

    //Pipes
    LocationGroupPipe,
    FilterServicePipe,
    TimeFilterPipe,
    AddonsPipe,
    FilterCartItemsPipe,
    OrderGuestTabsPipe,

    //Modals
    ModalServiceDetailComponent,
    ModalAddonsComponent, // addon popup, not in use
    ModalAddonDetailComponent,
    ModalIsAddonAddedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingRoutingModule,
    SharedComponentModule,
    NgxSliderModule,
  ]
})
export class BookingModule { }
