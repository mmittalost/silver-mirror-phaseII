import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, concat, forkJoin, Subject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SilverMirrorService {
  otp:any='';
  locationList$: BehaviorSubject<any> = new BehaviorSubject([]);
  serviceList$: BehaviorSubject<any> = new BehaviorSubject([]);
  getClientByEmail$: BehaviorSubject<any> = new BehaviorSubject([]);
  addNewClient$: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http:HttpClient,private router:Router) {
    this.getLocations();
   }
   getLocations() {
    this.http
      .get('http://blvd.ost.agency/get_locations')
      .subscribe((res: any) => {
        this.locationList$.next(res.data.locations.edges);
        console.log(res.data);
      });
  }

  getServices() {
    this.http
      .get('http://blvd.ost.agency/get_services')
      .subscribe((res: any) => {
        this.serviceList$.next(res.data);
        console.log(res.data);
      });
  }
  getClientByEmail(email:any) {
    const payload = {
      emails:[email]
    };    
    this.http
      .post('http://localhost:50000/get_client_by_email',payload)
      .subscribe((res: any) => {
        this.getClientByEmail$.next(res);
        console.log("resl",res.data.clients.edges.length);
      if(res.data.clients.edges.length==1)
      {
        this.otp = Math.floor((Math.random() * 1000000) + 1);
        localStorage.setItem('otp',this.otp);
      }
      else{
        this.router.navigate(['/register']);
      }
      });
  }

  addNewClient(data:any) {
    const payload = {client:{
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName,
      mobilePhone:data.phone
    }}; 
    console.log(">>Pay",payload); 
    this.http
      .post('http://localhost:50000/createClient',payload)
      .subscribe((res: any) => {
       // this.serviceList$.next(res.data);
        console.log(">>",res);
      });
  }
}
