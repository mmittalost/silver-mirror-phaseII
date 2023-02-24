import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    console.log("LoggedIn User : ", this.authService.$AuthUser.value);
    this._buildForm();
    this.bookingService.updateCartDetail();
    this.bookingService.clientCart$.subscribe((cart)=>{
      if(cart && cart.id){
        this.cart = cart;
        this.availablePaymentMethods = cart.availablePaymentMethods;
        if(cart.clientInformation){
          this._patchAdditionalInfoForm(cart.clientInformation);
        }
        console.log("Cart Data : ", cart);
      }
    })
  }

  constructor(private formBuilder:FormBuilder, private bookingService:BookingService, public authService:AuthService, private router:Router, private sharedService:SharedService){
    authService.$AuthUser.subscribe((user:any)=>{
      if(user){
        this.user = user;
        this._buildForm();
        this._patchAdditionalInfoForm(user);
      }
    });
  }

  _buildForm(){
    // PaymentForm
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
      cvv: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])],
      expiry: ['', Validators.compose([Validators.required, Validators.maxLength(7), Validators.minLength(7)])],
      postal_code: ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])],
    });

    // userInfoForm
    this.userInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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

  _patchAdditionalInfoForm(user:any){
    console.log("user to patch : ", user);
    this.userInfoForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobilePhone: user.mobilePhone || user.phoneNumber,
      note: user.clientNote ? user.clientNote : ''
    });
  }

  updatePaymentMethod(){
    // console.log(this.paymentForm.value);
    if(this.paymentForm.valid){
      this.bookingService.tokenizeCard(this.paymentForm.value).subscribe((res:any)=>{
        console.log(res);
        if(res.token){
          this.bookingService.addCartPaymentMethod(res.token).subscribe((res:any)=>{
            if(!res.errors){
              this.bookingService.updateCartDetail();
              this.paymentForm.reset();
              this.togglePaymentMethodForm = false;
            }else{
              console.log(res.errors[0].message);
            }
          });
        }
      },err=>{
        const title = 'Incorrect payment information';
        const message = 'Please fill the correct card detail.';
        this.sharedService.showNotification(title, message);
      })
    }else{
      const title = 'Incorrect payment information';
      const message = 'Please fill the correct card detail.';
      this.sharedService.showNotification(title, message);
    }
  }

  updateUserInfo(){
    // console.log(this.userInfoForm.value);
    if(this.userInfoForm.valid){
      this.bookingService.updateClientCartInfo(this.userInfoForm.value).subscribe((res:any)=>{
        if(!res.errors){
          this.bookingService.updateCartDetail();
        }else{
          console.log(res.errors[0].message);
        }
      });
    }else{
      const title = 'Incorrect user information';
      const message = 'Please fill the correct additional info.';
      this.sharedService.showNotification(title, message);
    }
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
    console.log("Apply Promo Code TESTPROMOTIONOST", this.couponForm.value, code, this.couponForm.valid);
  }

  checkout(){
    if(this.cart.clientInformation){
      this.bookingService.checkoutCart().subscribe((res:any)=>{
        if(!res.errors){
          const title = 'Appointment Booked';
          const message = 'your appointment is scheduled successfully.';
          this.sharedService.showNotification(title, message);
          this.router.navigateByUrl('/booking/congrats');
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
