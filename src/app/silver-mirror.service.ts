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
  otpMessage:any;
  locationList$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartDetail$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartDetails$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartSummary$: BehaviorSubject<any> = new BehaviorSubject([]);
  getClientByEmail$: BehaviorSubject<any> = new BehaviorSubject([]);
  addNewClient$: BehaviorSubject<any> = new BehaviorSubject([]);
  guestList$: BehaviorSubject<any> = new BehaviorSubject([]);
  cartItem$: BehaviorSubject<any> = new BehaviorSubject([]);
  location$: BehaviorSubject<any> = new BehaviorSubject([]);
  selectedAddons$: BehaviorSubject<any> = new BehaviorSubject([]);
  loginStatus:any=localStorage.getItem('loginStatus');
  loggedInclientName:any=localStorage.getItem('clientName');
  selectedLocation: string='';
  noOfGuest:number=0;
  guestID:any='';
  guestName:any='Guest0';
  addonsItemId:any='';
  checkAddedServices:any="Guest0";
  selectedServices: Set<number> = new Set<number>();
  selectedServiceID:any;
  addOns:any;
  selectedTabWithServices:any=[];
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
        this.cartSummary$.next(res.data.cart.summary);
        console.log("res.data.cart.selectedItems",res.data.cart.selectedItems);
        this.guestList$.next(res.data.cart.guests);
        this.location$.next(res.data.cart.location);
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
      console.log("Remove Guest Payload", this.guestList$.value);
      this.guestList$.value.forEach((guest: any) => {
        console.log(guest.id);
        let payload = {
          cartId:localStorage.getItem('cartID'),
          guestId:guest.id,
          clientId:localStorage.getItem("clientID")
        };
        let request = this.http.post(this.apiURL+'/remove_cart_guest',payload);
        requestArray.push(request);
      });

      forkJoin(requestArray)
      .pipe(finalize(() => {
        if (localStorage.getItem("selectedWhoscoming") != "me") {
          this.createGuest();
        } else {
          this.router.navigate(["/services"]);
        }
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
        localStorage.setItem("clientName",res.data.clients.edges[0].node.firstName);
        this.sendOTPEmail(res.data.clients.edges[0].node.email,this.otp,res.data.clients.edges[0].node.firstName);
      }
      else{
        this.router.navigate(['/register']);
      }
      });
  }
  sendOTPEmail(email:any,otp:any,name:any){
    const payload = {
      email:email,
      otp:otp,
      name:name
    };  
    this.http
      .post(this.apiURL+'/login',payload)
      .subscribe((res: any) => {
        this.otpMessage=res.message;
      });
  }
  addNewClient(data:any) {
    const payload = {client:{
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName,
      mobilePhone:data.phone
    }};  
    this.http
      .post(this.apiURL+'/createClient',payload)
      .subscribe((res: any) => {
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
    this.addonsItemId =itemId;
    let payload={};
    if(this.guestID !='me')
    {
      payload = {
        cartId:localStorage.getItem('cartID'),
        itemGuestId:this.guestID,
        itemId:itemId,
        clientId:''
      }; 
    }else{
    payload = {
      cartId:localStorage.getItem('cartID'),
      itemGuestId:'',
      itemId:itemId,
      clientId:''
    }; 
    }
    this.http
      .post(this.apiURL+'/add_item_in_cart',payload)
      .subscribe((res: any) => {
        this.cartItem$.next(res.data);
        this.selectedAddons$.next(res.data.addCartSelectedBookableItem.cart.selectedItems);
        this.selectedServices.add(this.checkAddedServices);
    
        this.selectedTabWithServices.push({[this.guestName]:itemId });
        localStorage.setItem(this.checkAddedServices, "yes");
        this.cartDetail();
      });
  }

  addAddonsInCart()
  {
    const requestArray:any = [];
    this.addOns.forEach((res: any) => {
      let payload = {
        cartId:localStorage.getItem('cartID'),
        guestId:this.guestID,
        itemId:res.addon,
        itemOptionIds:res.modifier,
        clientId:localStorage.getItem("clientID")
      };
      let request = this.http.post(this.apiURL+'/add_item_in_cart',payload);
        requestArray.push(request);
    });
      forkJoin(requestArray)
      .pipe(finalize(() => {
          this.router.navigate(["/services"]);
      }))
      .subscribe(response => {
        // Handle the response here
        console.log(response);
      }, error => {
        // Handle the error here
        console.error(error);
      });

   
   //let itemOptionIds =  Array.from(this.selectedAddonsId);
   
     
  /*   this.http
    .post(this.apiURL+'/add_item_in_cart',payload)
    .subscribe((res: any) => {
      console.log(">><<",res);
      
    }); */

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

  imageURL(serviceID: any, type:any) {
    let imgURL =
      "https://blvd.silvermirror.com/assets/"+type+"-" + serviceID + ".jpg";
    return imgURL;
  }

}
