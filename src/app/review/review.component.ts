import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Notification, NotificationService } from '../notification.service';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  paymentForm!:FormGroup;
  userInfoForm!: FormGroup;
  couponForm!:FormGroup;
  
  availablePaymentMethods:any = [];
  togglePaymentMethodForm:boolean = false;
  user:any = []


  ngOnInit(): void { 
    this._buildForm()
  }

  constructor(private formBuilder:FormBuilder, private bookingService:SilverMirrorService, private authService:AuthService, private notificationService: NotificationService, private router:Router){
    bookingService.cartDetail();
    authService.$AuthUser.subscribe((user:any)=>{
      if(user){
        this.user = user;
        this._buildForm();
        this._patchAdditionalInfoForm(user);
      }
    })
    bookingService.availablePaymentMethods$.subscribe((methods)=>{
      if(methods.length){
        this.availablePaymentMethods = methods;
      }
    });
    bookingService.cartClientInfo$.subscribe((info)=>{
      if(info){
        this._patchAdditionalInfoForm(info);
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
    console.log(this.paymentForm.value);
    if(this.paymentForm.valid){
      this.bookingService.tokenizeCard(this.paymentForm.value).subscribe((res:any)=>{
        console.log(res);
        if(res.token){
          this.bookingService.addCartPaymentMethod(res.token).subscribe((res:any)=>{
            if(!res.errors){
              this.bookingService.cartDetail();
              this.paymentForm.reset();
              this.togglePaymentMethodForm = false;
            }else{
              alert(res.errors[0].message);
            }
          });
        }
      })
    }else{
      alert("Fill the correct details!")
    }
  }

  updateUserInfo(){
    console.log(this.userInfoForm.value);
    if(this.userInfoForm.valid){
      this.bookingService.updateClientCartInfo(this.userInfoForm.value).subscribe((res:any)=>{
        if(!res.errors){
          this.bookingService.cartDetail();
        }else{
          alert(res.errors[0].message);
        }
      });
    }else{
      alert("Fill the correct details!");
    }
  }

  applyPromoCode(){
    const code = this.couponForm.value.promoCode;
    if(this.couponForm.valid && code!=''){
      this.bookingService.addCartOffer(code).subscribe((res:any)=>{
        if(!res.errors){
          this.bookingService.cartDetail();
        }else{
          const notification:Notification = {
            title:'Error',
            message: res.errors[0].message
          }
          this.notificationService.$notification.next(notification);
        }
      })
    }
    console.log("Apply Promo Code TESTPROMOTIONOST", this.couponForm.value, code, this.couponForm.valid);
  }

  checkout(){
    this.bookingService.checkoutCart().subscribe((res:any)=>{
      if(!res.errors){
        this.router.navigateByUrl('/congrats');
        this.bookingService.cartDetail();
      }else{
        const notification:Notification = {
          title:'Error',
          message: res.errors[0].message
        }
        this.notificationService.$notification.next(notification);
      }
    })
  }
}
