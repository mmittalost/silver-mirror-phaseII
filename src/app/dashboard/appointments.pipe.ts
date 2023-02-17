import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pastappointments'
})
export class UpcomingAppointmentsPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): Array<any> {
    console.log('Array : ',value);
    return value.length ? value.filter((val)=> new Date(val.node.startAt) < new Date()) : value;
  }

}

@Pipe({
  name: 'upcomingappointments'
})
export class PastAppointmentsPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): Array<any> {
    return value.length ? value.filter((val)=> new Date(val.node.startAt) > new Date()) : value;
  }

}