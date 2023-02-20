import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, concat, forkJoin, Subject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

const BASE_URL = "http://localhost:50000";
const CLIENT_ID = "103b0694-709c-4949-afc0-a45822467bae"; // himanshu.sharma@opensourcetechnologies.com
// const CLIENT_ID = "0b9b1658-d8f2-4f3e-aabc-0574ef6a8af9" // testost1@gmail.com

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    $myAppointments:BehaviorSubject<any> = new BehaviorSubject([]);
    $servicesList:BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(private httpClient: HttpClient){}

    getServices(){
        this.httpClient.get<HttpResponse<any>>(BASE_URL + '/get_services').subscribe((res:any)=>{
            if(!res.errors){
                this.$servicesList.next(res.data.services.edges);
            }else{
                alert(res.errors[0].message);
            }
        });
    }

    getAppointmentsList():Observable<HttpResponse<any>>{
        const payload = {
            "clientId": CLIENT_ID
        }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/my_appointments', payload).pipe(map((res:any)=>{
            const services = this.$servicesList.value;

            // Filter out duplicate edges
            res.data.myAppointments.edges.filter((item:any, index:number) => res.data.myAppointments.edges.indexOf(item) !== index);
            
            res.data.myAppointments.edges.map((apt: any) => {
                apt.node.appointmentServiceOptions.map((appointmentServiceOption: any) => {
                    services.map((service: any) => {
                    if (service.node.serviceOptionGroups.length) {
                      service.node.serviceOptionGroups.map((optionGroup: any) => {
                        if (optionGroup.serviceOptions.length) {
                          const match = optionGroup.serviceOptions.filter((option: any) => {
                              /* console.log(option.id,"<====>",appointmentServiceOption.id, option.id == appointmentServiceOption.serviceOptionId) */;
                              return option.id == appointmentServiceOption.serviceOptionId
                          })
                          console.log(match);
                          match.length ? appointmentServiceOption.name = match[0].name : null;
                        }
                      })
                    }
                  });
                })
              });
            return res;
        }));
    }

    cancelAppointment(aptId:string):Observable<HttpResponse<any>>{
        const payload = {
            "clientId": CLIENT_ID,
            "appointmentId": aptId,
            "notes":""
        }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/cancel_appointment', payload);
    }

    getClientInfo():Observable<HttpResponse<any>>{
        const payload = {
            "clientId": CLIENT_ID
        }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/get_client_by_id', payload);
    }

    updateClientInfo(client:any):Observable<HttpResponse<any>>{
        const payload = {
            "clientId": CLIENT_ID,
            "client": client
          }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/update_client', payload);
    }

    myMembershipsList(){
        const payload = {
            "clientId": CLIENT_ID
          }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/my_memberships', payload);
    }

    getRescheduleDates(aptId:string, lowerRange:string, upperRange:string){
        const payload = {
            "appointmentId":aptId,
            "searchRangeLower":lowerRange,
            "searchRangeUpper":upperRange,
            "timeZone":'EST'
          }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/appointment_reschedule_available_dates', payload);
    }

    getRescheduleTimes(aptId:string, date:string){
        const payload = {
            "appointmentId":aptId,
            "date":date,
            "timeZone":'EST'
          }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/appointment_reschedule_available_times', payload);
    }

    reschedule(aptId:string, timeId:string){
        const payload = {
            "appointmentId":aptId,
            "bookableTimeId":timeId
          }
        return this.httpClient.post<HttpResponse<any>>(BASE_URL + '/rechedule_appointment', payload);
    }
}