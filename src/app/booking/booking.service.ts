import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../shared-component/shared.service';

const BASE_URL = "https://blvd.silvermirror.com";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient, private authService:AuthService, private sharedService:SharedService) { }

  locationList$: BehaviorSubject<any> = new BehaviorSubject([]);
  clientCart$: BehaviorSubject<any> = new BehaviorSubject([]);
  checkoutBookingResponse$: BehaviorSubject<any> = new BehaviorSubject(null);

  getLocations() {
    return this.http.get(BASE_URL+'/get_locations');
  }

  createCart(locationId:string){
    const payload = {
      locationID:locationId,
      client_id:this.authService.$AuthUser.value?.authId
    }; 
    return this.http.post(BASE_URL+'/create_cart', payload);
  }

  getCartDetail(){
    const payload = {
      cartID: this.sharedService.getLocalStorageItem('cartId'),
      clientId: this.authService.$AuthUser.value?.authId
    }; 
    return this.http.post(BASE_URL+'/get_cart_detail',payload);
  }

  createGuest(){
    const guest = {
      "firstName":"",
      "lastName":"",
      "mobileNumber":"",
      "email":"guest@silvermirror.com"
      }
    const payload = {
      cartID: this.sharedService.getLocalStorageItem('cartId'),
      client: guest,
      client_id: this.authService.$AuthUser.value?.authId
    };
    return this.http.post(BASE_URL+'/create_cart_guest',payload);
  }

  removeGuest(guestId:string){
    let payload = {
      cartId:this.sharedService.getLocalStorageItem('cartId'),
      guestId: guestId,
      clientId:this.authService.$AuthUser.value?.authId
    };
    return this.http.post(BASE_URL+'/remove_cart_guest',payload);
  }

  updateCartDetail(){
    const cartId = this.sharedService.getLocalStorageItem('cartId');
    if(cartId){
      this.getCartDetail().subscribe((res:any)=>{
        if(!res.errors){
          this.clientCart$.next(res.data.cart);
        }
      });
    }else{
      console.log('cart does not exist!');
    }
  }

  addItemInCart(item:any){
    const payload = {
      "cartId": this.sharedService.getLocalStorageItem('cartId'),
      "itemGuestId": item.guestId,
      "itemId": item.id,
      "itemStaffVariantId": item.staffId
    }
    return this.http.post(BASE_URL+'/add_item_in_cart',payload);
  }

  addAddonInCart(item:any){
    const payload = {
      "cartId": this.sharedService.getLocalStorageItem('cartId'),
      "itemGuestId":item.guestId,
      "itemId": item.id,
      "itemOptionIds": item.optionIds
    }
    return this.http.post(BASE_URL+'/add_service_options_in_cart',payload);
  }

  removeItemInCart(itemId:string){
    const payload = {
      "cartId":this.sharedService.getLocalStorageItem('cartId'),
      "itemId": itemId
    }
    return this.http.post(BASE_URL+'/remove_item_in_cart',payload);
  }

  getScheduleDates(locationId:string){
    const payload = {
      "cartID":this.sharedService.getLocalStorageItem('cartId'),
      "locationID":locationId,
      "timeZone":"EST",
      "limit":31,
      "clientId": this.authService.$AuthUser.value?.authId
    }
    return this.http.post(BASE_URL + '/get_cart_bookable_dates', payload);
  }

  getScheduleTimes(date:string){
    const payload = {
      "cartID":this.sharedService.getLocalStorageItem('cartId'),
      "searchDate":date,
      "timeZone":"EST",
      "clientId": this.authService.$AuthUser.value?.authId
    }
    return this.http.post(BASE_URL + '/get_cart_bookable_times', payload);
  }

  reserveCartItems(bookableTimeId:string){
    const payload = {
      "cartId":this.sharedService.getLocalStorageItem('cartId'),
      "bookableTimeId":bookableTimeId,
      "clientId": this.authService.$AuthUser.value?.authId
    }
    return this.http.post(BASE_URL + '/reserve_cart_bookable_items', payload);
  }
  
  getCartStaffVarients(bookableTimeId:string, serviceId:string, locationId:string, ){
    const payload = {
      "cartId":this.sharedService.getLocalStorageItem('cartId'),
      "bookableTimeId":bookableTimeId,
      "serviceId":serviceId,
      "locationId":locationId,
      "clientId": this.authService.$AuthUser.value?.authId
    }
    return this.http.post(BASE_URL + '/get_cart_staff_variants', payload);
  }

  updateItemInCart(itemId:any, staffId:string){
    const payload = {
      cartId:this.sharedService.getLocalStorageItem('cartId'),
      itemGuestId:'',
      itemId:itemId,
      clientId:'',
      itemStaffVariantId:staffId
    };
    return this.http.post(BASE_URL+'/update_item_in_cart',payload);
  }

  tokenizeCard(card:any){
    const tokenize_url = "https://pci.boulevard.app/cards/tokenize";
    const payload = {
      "card": {
        "name": card.name,
        "number": card.number,
        "cvv": card.cvv,
        "exp_month": card.expiry.substring(0,2),
        "exp_year": card.expiry.substring(3,7),
        "address_postal_code": card.postal_code
      }
    }
    return this.http.post(tokenize_url,payload);
  }

  addCartPaymentMethod(token:string){
    const payload = {
      "cartId": this.sharedService.getLocalStorageItem('cartId'),
      "select":true,
      "token":token
    }
    return this.http.post(BASE_URL+ '/add_cart_card_payment_method',payload);
  }

  updateClientCartInfo(client:any){
    const payload = {
      "cartId": this.sharedService.getLocalStorageItem('cartId'),
      "clientInfo":{
        "email": client.email,
        "firstName":client.firstName,
        "lastName":client.lastName,
        "phoneNumber":client.mobilePhone
      },
      "clientNote":client.note
    }
    return this.http.post(BASE_URL+ '/update_cart_client_info',payload);
  }

  addCartOffer(offerCode:string){
    const payload = {
      "cartId": this.sharedService.getLocalStorageItem('cartId'),
      "offerCode":offerCode
    }
    return this.http.post(BASE_URL+ '/add_cart_offer',payload);
  }

  checkoutCart(){
    const payload = {
      "cartId": this.sharedService.getLocalStorageItem('cartId'),
      "clientId": this.authService.$AuthUser.value?.authId
    }
    return this.http.post(BASE_URL+ '/checkout_cart',payload);
  }

  checkoutComplete(){
    this.sharedService.removeLocalStorageItem('cartId');
    this.sharedService.removeLocalStorageItem('selectedLocation');
  }

  getAppointmentDetail(aptId:string, cartId:string)
  {
    const payload = { 
      "cartId": cartId,
      "appointmentId": aptId,
      "clientId": this.authService.$AuthUser.value?.authId
    }
    return this.http.post(BASE_URL+ '/appointment_detail',payload);
  }

}
