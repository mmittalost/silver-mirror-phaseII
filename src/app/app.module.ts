import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    CongratsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
