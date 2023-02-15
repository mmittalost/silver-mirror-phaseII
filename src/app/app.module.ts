import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAnAppointmentComponent } from './book-an-appointment/book-an-appointment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { AlertComponent } from './alert/alert.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
@NgModule({
  declarations: [
    AppComponent,
    BookAnAppointmentComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LocationComponent,
    WhosComingComponent,
    ServicesComponent,
    SchedulingComponent,
    ReviewComponent,
    CongratsComponent,
    LocationGroupPipe,
    FacialFilterPipe,
    AlertComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    MdbCheckboxModule,
    MdbModalModule
  ],
  entryComponents: [
    AlertComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
