import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, concat, forkJoin, Subject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SilverMirrorService {
  apiURL:any="http://blvd.ost.agency";
  //apiURL:any="http://localhost:50000";
  otp:any='';
  locationList$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartDetail$: BehaviorSubject<any> = new BehaviorSubject([]);
  getClientByEmail$: BehaviorSubject<any> = new BehaviorSubject([]);
  addNewClient$: BehaviorSubject<any> = new BehaviorSubject([]);
  guestList$: BehaviorSubject<any> = new BehaviorSubject([]);
  loginStatus:boolean=false;
  selectedLocation: string='';
  noOfGuest:number=0;
  constructor(private http:HttpClient,private router:Router) {
    this.getLocations();
   }
   getLocations() {
    this.http
      .get(this.apiURL+'/get_locations')
      .subscribe((res: any) => {
        this.locationList$.next(res.data.locations.edges);
        console.log(res.data);
      });
  }

  createCart(id:any) {
    const payload = {
      locationID:id,
      client_id:''
    }; 
    console.log("Pay",payload);
    this.http
      .post(this.apiURL+'/create_cart',payload)
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('cartID',res.data.createCart.cart.id);
        this.router.navigate(['/whoscoming']);
      });
  }
  cartDetail(){
    const payload = {
      cartID:localStorage.getItem('cartID'),
      client_id:''
    }; 
    this.http
      .post(this.apiURL+'/get_cart_detail',payload)
      .subscribe((res: any) => {
        this.cartDetail$.next(res.data.cart.availableCategories);
        console.log(">>",res);
      });
  }
  createGuest(){
    const payload = {
      cartID:localStorage.getItem('cartID'),
      "client":{
        "firstName":"",
        "lastName":"",
        "mobileNumber":"",
        "email":"guest@silvermirror.com"
        },
      client_id:''
    }; 
    const request = this.http.post(this.apiURL+'/create_cart_guest',payload);
    const requestArray:any = [];
    let i;
    for(i = 1; i<=this.noOfGuest;i++) {
      requestArray.push(request);
   }
    console.log("Payload",payload);
    forkJoin(requestArray).subscribe((res: any) => {
      console.log(">>>>>>>>><<<<<",res[0]);
        this.guestList$.next(res[0].data.createCartGuest.cart.guests);
      });
  }
  getClientByEmail(email:any) {
    const payload = {
      emails:[email]
    };    
    this.http
      .post(this.apiURL+'/get_client_by_email',payload)
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
      .post(this.apiURL+'/createClient',payload)
      .subscribe((res: any) => {
       // this.serviceList$.next(res.data);
        console.log(">>",res);
      });
  }
  selectLocation(id:any){
    localStorage.setItem('selectedLocation',id);
    console.log("ID",id);
    this.createCart(id);
  
  }
}
