import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CalendarComponent } from '../shared-component/calendar/calendar.component';
import { ToggleCalendarPipe } from './calendar/toggle-calendar.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    CalendarComponent,
    ToggleCalendarPipe
  ],
  imports: [
    CommonModule,
  ],
  exports:[HeaderComponent, CalendarComponent, ToggleCalendarPipe]
})
export class SharedComponentModule { }
