import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared-component/shared.service';
import { AuthService } from '../../auth/auth.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  paymentForm!:FormGroup;
  userInfoForm!: FormGroup;
  couponForm!:FormGroup;
  
  cart:any;
  availablePaymentMethods:any = [];
  togglePaymentMethodForm:boolean = false;
  user:any = []


  ngOnInit(): void {
    this._buildForm();
    this.authService.$AuthUser.subscribe((user:any)=>{
      if(user){
        this._patchAdditionalInfoForm(user);
        // this.bookingService.takeCartOwnership().subscribe((res:any)=>{
        //   if(!res.errors){
        //     this.bookingService.updateCartDetail();
        //   }
        // });
        
      }
    });
    this.bookingService.updateCartDetail();
    // this.bookingService.updateCartDetail();
    this.bookingService.clientCart$.subscribe((cart)=>{
      if(cart && cart.id){
        this.cart = cart;
        this.availablePaymentMethods = cart.availablePaymentMethods;
        this._patchCouponForm(cart.offers);
        if(cart.clientInformation){
          // this._patchAdditionalInfoForm(cart.clientInformation);
        }
      }
    })
  }

  constructor(private formBuilder:FormBuilder, private bookingService:BookingService, public authService:AuthService, private router:Router, private sharedService:SharedService){
    // authService.$AuthUser.subscribe((user:any)=>{
    //   if(user){
    //     this.user = user;
    //     this._buildForm();
    //     this._patchAdditionalInfoForm(user);
    //   }
    // });
  }

  cvvValidator(control: FormControl): { [key: string]: any } | null {
    const valid = /^\d{3,4}$/.test(control.value);
    return valid ? null : { invalidCVV: true };
  }

  maskExpiryDate(expiryDate: string): string {
    // Extract the month and year from the expiry date string
    const [month, year] = expiryDate.split('/');
  
    // Replace the year with asterisks
    const maskedYear = year;
  
    // Concatenate the masked month and year with a forward slash
    const maskedExpiryDate = `${month}/${maskedYear}`;
  
    return maskedExpiryDate;
  }

  onExpiryDateInput(): void {
    // Get the raw input value from the input field
    const rawValue = this.paymentForm.value.expiry.replace(/\D/g, '');

    // Extract the month and year components from the raw input value
    const month = rawValue.substr(0, 2);
    const year = rawValue.substr(2, 4);

    // Mask the expiry date
    const maskedExpiryDate = this.maskExpiryDate(`${month}/${year}`);

    // Update the input field value with the masked expiry date
    this.paymentForm.patchValue({
      expiry:maskedExpiryDate
    });
  }

  _buildForm(){
    // PaymentForm
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
      cvv: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(3), this.cvvValidator])],
      expiry: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.minLength(7)])],
      postal_code: ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])],
    });

    // userInfoForm
    this.userInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      // dob: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobilePhone: ['', Validators.required],
      note: [''],
    });

    // couponForm
    this.couponForm = this.formBuilder.group({
      promoCode: ['', Validators.required]
    });
  }

  _patchCouponForm(offers:any){
    if(offers.length){
      let code = offers[0].code;
      this.couponForm.patchValue({
        promoCode: code
      });
      this.couponForm.disable();
    }else{
      this.couponForm.patchValue({
        promoCode: ''
      });
      this.couponForm.enable();
    }
  }

  _patchAdditionalInfoForm(user:any){
    this.userInfoForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobilePhone: user.mobilePhone || user.phoneNumber,
      note: user.clientNote ? user.clientNote : ''
    });
  }

  updatePaymentMethod(){
    return new Promise((resolve, reject)=>{
      if(this.paymentForm.valid){
        this.bookingService.tokenizeCard(this.paymentForm.value).subscribe((res:any)=>{
          if(res.token){
            this.bookingService.addCartPaymentMethod(res.token).subscribe((res:any)=>{
              if(!res.errors){
                // this.bookingService.updateCartDetail();
                resolve(true);
                this.paymentForm.reset();
                this.togglePaymentMethodForm = false;
              }else{
                reject();
              }
            });
          }else{
            reject();
          }
        },err=>{
          reject();
          const title = 'Incorrect payment information';
          const message = 'Please add correct card';
          this.sharedService.showNotification(title, message);
        })
      }else{
        reject();
        const title = 'Incorrect payment information';
        const message = 'Please add correct card';
        this.sharedService.showNotification(title, message);
      }
    });
  }

  selectPaymentMethod(card:any){
    this.bookingService.selectPaymentMethod(card.id).subscribe((res:any)=>{
      if(!res.errors){
        card.active = true;
        this.bookingService.updateCartDetail();
      }
    })
  }

  updateUserInfo(){
    return new Promise((resolve, reject)=>{
      if(this.userInfoForm.valid){
        this.bookingService.updateClientCartInfo(this.userInfoForm.value).subscribe((res:any)=>{
          if(!res.errors){
            resolve(true);
            // this.bookingService.updateCartDetail();
          }else{
            reject();
          }
        });
      }else{
        reject();
        const title = 'Incorrect user information';
        const message = 'Please fill the correct additional info.';
        this.sharedService.showNotification(title, message);
      }
    })
  }

  updateCartDetail(){
    return new Promise((resolve, reject)=>{
      const cartId = this.sharedService.getLocalStorageItem('cartId');
      if(cartId){
        this.bookingService.getCartDetail().subscribe((res:any)=>{
          if(!res.errors){
            resolve(true);
            this.bookingService.clientCart$.next(res.data.cart);
          }else{
            reject();
          }
        });
      }else{
        reject();
      }
    })
  }

  applyPromoCode(){
    const code = this.couponForm.value.promoCode;
    if(this.couponForm.valid && code!=''){
      this.bookingService.addCartOffer(code).subscribe((res:any)=>{
        if(!res.errors){
          this.bookingService.updateCartDetail();
        }else{
          const title = 'Invalid promo code';
          const message = 'Please enter valid promo code.';
          this.sharedService.showNotification(title, message);
        }
      })
    }else{
      const title = 'Incorrect promo code';
      const message = 'Please fill the correct promo code.';
      this.sharedService.showNotification(title, message);
    }
  }

  removePromoCode(){
    let offerId = this.cart.offers[0].id;
    this.bookingService.removeCartOffer(offerId).subscribe((res:any)=>{
      if(!res.errors){
        this.bookingService.updateCartDetail();
      }
    })
  }

  easyCheckout(){
    window.scrollTo(0, 0);
    if(this.cart?.selectedItems[0]?.selectedPaymentMethod?.id){ // If payment method is selected by user
      this.updateUserInfo().then((status:any)=>{
        if(status){
          this.updateCartDetail().then((status:any)=>{
            if(status){
              this.checkout();
            }
          })
        }
      });
    }else{
      this.updatePaymentMethod().then((status:any)=>{ // If payment method is needed to be add
        if(status){
          this.updateUserInfo().then((status:any)=>{
            if(status){
              this.updateCartDetail().then((status:any)=>{
                if(status){
                  this.checkout();
                }
              });
            }
          });
        }
      });
    }
  }

  checkout(){
    if(this.cart.clientInformation){
      this.bookingService.checkoutCart().subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Appointment Booked';
          const message = 'your appointment is scheduled successfully.';
          this.sharedService.showNotification(title, message);
          this.router.navigateByUrl('/booking/congrats');
          this.bookingService.checkoutBookingResponse$.next(res.data.checkoutCart);
          this.sharedService.removeLocalStorageItem('cartId');
          this.sharedService.removeLocalStorageItem('selectedLocation');
          this.sharedService.removeLocalStorageItem('guestSet');
          this.bookingService.updateCartDetail();
  
        }else{
          const title = 'Checkout Error';
          const message = res.errors[0].message;
          this.sharedService.showNotification(title, message);
        }
      })
    }else{
      const title = 'Additional information is required';
      const message = 'please save the additional information.';
      this.sharedService.showNotification(title, message);
    }
  }
}
