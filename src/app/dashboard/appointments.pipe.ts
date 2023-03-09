import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'pastappointments'
})
export class UpcomingAppointmentsPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): Array<any> {
    return value.length ? value.filter((val)=> new Date(val.node.startAt) < new Date()).sort((a, b) => moment(b.node['startAt']).diff(moment(a.node['startAt']))) : value;
  }

}

@Pipe({
  name: 'upcomingappointments'
})
export class PastAppointmentsPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): Array<any> {
    return value.length ? value.filter((val)=> new Date(val.node.startAt) > new Date()).sort((a, b) => moment(a.node['startAt']).diff(moment(b.node['startAt']))) : value;
  }

}