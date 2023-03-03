import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent {

  @Input() calendar:any;
  @Input() currentMonth:any;
  @Input() selectedDate:any;

  @Output() prevMonthEvent = new EventEmitter<moment.Moment>();
  @Output() nextMonthEvent = new EventEmitter<moment.Moment>();
  @Output() selectDateEvent = new EventEmitter<moment.Moment>();

  constructor(private changeRef:ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges) {
    console.log("POPUP CHANGE : ", changes)
    changes.selectedDate ? this.selectedDate = changes.selectedDate.currentValue : null;
    console.log(this.selectedDate);
    this.changeRef.detectChanges();
  }

  nextMonth(){
    this.nextMonthEvent.emit();
  }

  prevMonth(){
    this.prevMonthEvent.emit();
  }

  selectDate(date:any){
    // this.selectedDate = date;
    this.selectDateEvent.emit(date);
  }
}
