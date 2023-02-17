import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, concat, forkJoin, Subject, map } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SilverMirrorService {
  apiURL:any="https://blvd.silvermirror.com";
  //apiURL:any="http://localhost:50000";
  loginLogoutText:any='Sign In';
  otp:any='';
  selectedAddonsId: Set<number> = new Set<number>();
  locationList$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartDetail$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartDetails$: BehaviorSubject<any> = new BehaviorSubject([]);
  getClientByEmail$: BehaviorSubject<any> = new BehaviorSubject([]);
  addNewClient$: BehaviorSubject<any> = new BehaviorSubject([]);
  guestList$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartItem$: BehaviorSubject<any> = new BehaviorSubject([]);
  location$: BehaviorSubject<any> = new BehaviorSubject([]);
  selectedAddons$: BehaviorSubject<any> = new BehaviorSubject([]);
  loginStatus:any=localStorage.getItem('loginStatus');
  selectedLocation: string='';
  noOfGuest:number=0;
  guestID:any='';
  guestName:any='';
  addonsItemId:any='';
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
      client_id:localStorage.getItem("clientID")
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
      clientId:localStorage.getItem("clientID")
    }; 
    this.http
      .post(this.apiURL+'/get_cart_detail',payload)
      .subscribe((res: any) => {
        this.cartDetail$.next(res.data.cart.availableCategories);
        this.cartDetails$.next(res.data.cart.selectedItems);
        console.log("res.data.cart.selectedItems",res.data.cart.selectedItems);
        this.guestList$.next(res.data.cart.guests);
        this.location$.next(res.data.cart.location);
        //console.log(">>",res);
      });
  }
  async createGuest(){
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
   console.log("requestArray",requestArray);
   forkJoin(requestArray)
      .pipe(finalize(() => {
        // Navigate to home screen
        this.router.navigate(['/services']);
      }))
      .subscribe(response => {
        // Handle the response here
        console.log(response);
      }, error => {
        // Handle the error here
        console.error(error);
      });
   
  }

  removeGuest(){
    const requestArray:any = [];
    let i:number=0;
    this.guestList$.subscribe((res: any) => {
      const payload = {
        cartId:localStorage.getItem('cartID'),
        guestId:res[i].id,
        clientId:localStorage.getItem("clientID")
      }; 
      const request = this.http.post(this.apiURL+'/remove_cart_guest',payload);
      console.log("Guest",res[i].id);
      requestArray.push(request);
      i++;
      });
      forkJoin(requestArray)
      .pipe(finalize(() => {
        // Navigate to home screen
        this.createGuest();
      }))
      .subscribe(response => {
        // Handle the response here
        console.log(response);
      }, error => {
        // Handle the error here
        console.error(error);
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
      if(res.data.clients.edges.length==1)
      {
        this.otp = Math.floor((Math.random() * 1000000) + 1);
        localStorage.setItem('otp',this.otp);
        localStorage.setItem("clientID",res.data.clients.edges[0].node.id.replace('urn:blvd:Client:',''));
        localStorage.setItem("clientEmail",res.data.clients.edges[0].node.email);
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
  addItemInCart(itemId:any)
  {
    //this.selectedAddons$.next([]);
    this.addonsItemId =itemId;
    let payload={};
    if(this.guestID)
    {
      payload = {
        cartId:localStorage.getItem('cartID'),
        itemGuestId:this.guestID,
        itemId:itemId,
        //itemStaffVariantId:'',
        clientId:''
      }; 
    }else{
    payload = {
      cartId:localStorage.getItem('cartID'),
      itemGuestId:'',
      itemId:itemId,
      //itemStaffVariantId:'',
      clientId:''
    }; 
    }
    console.log(">>Pay",payload); 
    this.http
      .post(this.apiURL+'/add_item_in_cart',payload)
      .subscribe((res: any) => {
        this.cartItem$.next(res.data);
        this.selectedAddons$.next(res.data.addCartSelectedBookableItem.cart.selectedItems);
        this.cartDetail();
        console.log(">><<",res);
      });
  }
  removeItemFromCart(itemId:any)
  {
    this.addonsItemId =itemId;
    let payload={};
    payload = {
      cartId:localStorage.getItem('cartID'),
      itemId:itemId,
      clientId:localStorage.getItem('clientID'),
    }; 
    
    console.log(">>Pay",payload); 
    this.http
      .post(this.apiURL+'/remove_item_in_cart',payload)
      .subscribe((res: any) => {
        console.log("Res cart remove",res);
        this.cartDetail();
      });
  }
}
