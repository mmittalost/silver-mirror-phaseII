import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from '../shared-component/calendar/calendar.component';
import { ToggleCalendarPipe } from './calendar/toggle-calendar.pipe';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    ToggleCalendarPipe
  ],
  imports: [
    CommonModule,
  ],
  exports:[HeaderComponent, FooterComponent, CalendarComponent, ToggleCalendarPipe]
})
export class SharedComponentModule { }
