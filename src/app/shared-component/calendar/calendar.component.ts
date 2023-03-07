import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: any[][] = [];
  showFullCalendar = false;
  selectedWeek:number = 0;
  currentMonth: moment.Moment = moment().startOf('month');

  @Input() availableDates = [];
  @Input() selectedDate:any;

  @Output() changeMonthEvent = new EventEmitter<moment.Moment>();
  @Output() dateSelectEvent = new EventEmitter<moment.Moment>();

  constructor(){}

  ngOnInit(): void {
    this.generateCalendar(this.currentMonth);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateCalendar(this.currentMonth);
  }

  selectDate(day:any){
    day.isCurrentMonth ? this.selectedWeek = day.week : this.selectedWeek = 0;
    // this.selectedDate = day;
    this.dateSelectEvent.emit(day);
  }

  toggleCalendarView() {
    // this.selectedWeek = 0;
    this.showFullCalendar = !this.showFullCalendar;
  }

  generateCalendar(month: moment.Moment) {
    // Generate the calendar for the given month
  
    // Determine the first day of the month and the last day of the month
    let firstDay = month.month() == moment().month() && month.year() == moment().year() ? moment() : moment(month).startOf('month');

    // moment(month).startOf('month');
    const lastDay = moment(month).endOf('month');
  
    // Determine the number of days in the month
    const numDays = lastDay.date();
  
    // Determine the number of days to show from the previous month
    const prevMonthNumDays = firstDay.weekday() === 0 ? 6 : firstDay.weekday() - 1;
  
    // Determine the number of days to show from the next month
    // const nextMonthNumDays = 7 - lastDay.weekday() - 1;
  
    // Determine the first day to show in the calendar
    const firstDate = firstDay.subtract(prevMonthNumDays, 'days');
  
    // Determine the last day to show in the calendar
    // const lastDate = lastDay.add(nextMonthNumDays, 'days');
  
    // Generate an array of moment objects representing each day in the calendar
    const calendar = [];
    let currentDay = firstDate;
  
    while (currentDay.isBefore(lastDay)) {
      const week = [];
  
      for (let i = 0; i < 7; i++) {
        const day = {
          date: currentDay.date(),
          fullDate: currentDay.format('YYYY-MM-DD'),
          isAvailable: this.availableDates.findIndex((date:any)=> date.date == currentDay.format('YYYY-MM-DD')) >= 0 ? true : false,
          isToday: currentDay.isSame(moment(), 'day'),
          day: currentDay.format('ddd'),
          isDisabled: currentDay.isBefore(moment().startOf('day')),
          month: currentDay.month(),
          week: currentDay.week() - moment(currentDay).startOf('month').week(),
          year: currentDay.year(),
          isCurrentMonth: currentDay.month() === month.month(),
          dayShortName: currentDay.format('ddd')
        };
        week.push(day);
  
        currentDay = currentDay.add(1, 'days');
      }
  
      calendar.push(week);
    }
  
    this.calendar = calendar;
  }

  previousMonth() {
    // Check if the current month is January
    if(!this.showFullCalendar && this.selectedWeek > 0 ){
      this.selectedWeek = --this.selectedWeek;
    }else if (this.currentMonth.month() === moment().month() && this.currentMonth.year() === moment().year()) {
      return;
    }else{
      // Go to the previous month and regenerate the calendar
      this.calendar = [];
      this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
      this.generateCalendar(this.currentMonth);
      this.selectedWeek = this.calendar.length - 1;
      this.changeMonthEvent.emit(this.currentMonth);
    }
  }

  nextMonth() {
    if(!this.showFullCalendar && this.selectedWeek < this.calendar.length - 1){
      this.selectedWeek = ++this.selectedWeek;
    }else{
      // Go to the next month and regenerate the calendar
      this.calendar = [];
      this.currentMonth = this.currentMonth.clone().add(1, 'month');
      this.generateCalendar(this.currentMonth);
      this.selectedWeek = 0;
      this.changeMonthEvent.emit(this.currentMonth);
    }
  }

}
