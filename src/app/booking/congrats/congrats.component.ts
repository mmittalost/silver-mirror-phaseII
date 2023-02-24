/*
  * Appointment Detail Component
  * NOTE: Inject HTTPCLIENT in this component no extra service is needed
  * NOTE: In UI DOM no change is needed
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {

  // use this varibale to feed data in html
  appointmentDetail:any;

  constructor(){
    this.getAppointmentDetail();
  }

  getAppointmentDetail(){
    // write code to fetch appointment detail
  
  }

}