import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: any[][] = [];
  showFullCalendar = false;
  selectedWeek:number = moment().week() - moment().startOf('month').week();
  currentMonth: moment.Moment = moment().startOf('month');

  @Input() availableDates = [];
  @Input() selectedDate:any;

  @Output() changeMonthEvent = new EventEmitter<moment.Moment>();
  @Output() dateSelectEvent = new EventEmitter<moment.Moment>();

  constructor(@Inject(DOCUMENT) private document: Document, private changeRef:ChangeDetectorRef){}

  ngOnInit(): void {
    const CalendarToggleButton:any = document.querySelector('.show-calendar');
    CalendarToggleButton.addEventListener('click', this.toggleCalendarView.bind(this));

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.document.addEventListener('click', this.handleDocumentClick);
    
    this.generateCalendar(this.currentMonth);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateCalendar(this.currentMonth);
  }

  ngOnDestroy(): void {
    // remove click listener when component is destroyed
    this.document.removeEventListener('click', this.handleDocumentClick);
    this.document.removeEventListener('click', this.toggleCalendarView);
  }

  handleDocumentClick(event: any): void {
    // handle click event
    if (!event.target.closest('.show-calendar') && !event.target.closest('.next-month') && !event.target.closest('.last-month') && !event.target.closest('.next-week') && !event.target.closest('.last-week') && !event.target.closest('.monthday')) {
      console.log('clicked outside button');
      this.showFullCalendar = false;
    }
    console.log('clicked', event.target, this.showFullCalendar);
    this.changeRef.detectChanges();
  }

  selectDate(day:any){
    console.log("Selected Week : ", day);
    if(day.visibleMonth > day.month){
      this.selectedWeek = 0;
    }else{
      this.selectedWeek = day.week;
    }
    // this.selectedWeek = day.week - 1;
    // day.isCurrentMonth ? this.selectedWeek = day.week : this.selectedWeek = 0;
    // this.selectedDate = day;
    this.dateSelectEvent.emit(day);
  }

  toggleCalendarView(ev:any) {
    ev.preventDefault();
    // this.selectedWeek = 0;
    this.showFullCalendar = !this.showFullCalendar;
  }

  generateCalendar(month: moment.Moment) {
    // Set locale to have Sunday as the first day of the week
    moment.updateLocale('en', {
      week: {
        dow: 0 // Sunday is the first day of the week
      }
    });
    // Generate the calendar for the given month
  
    // Determine the first day of the month and the last day of the month
    let firstDay = moment(month).startOf('month');
    // let firstDay = month.month() == moment().month() && month.year() == moment().year() ? moment() : moment(month).startOf('month');

    // moment(month).startOf('month');
    const lastDay = moment(month).endOf('month');
  
    // Determine the number of days in the month
    const numDays = lastDay.date();
  
    // Determine the number of days to show from the previous month
    // const prevMonthNumDays = firstDay.weekday() === 0 ? 6 : firstDay.weekday() - 1;
    const prevMonthNumDays = firstDay.isoWeekday() === 7 ? 0 : firstDay.isoWeekday();
  
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
          visibleMonth: this.currentMonth.month(),
          week: currentDay.week() - moment(currentDay).startOf('month').week(),
          year: currentDay.year(),
          isCurrentMonth: currentDay.month() === moment().month(),
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
