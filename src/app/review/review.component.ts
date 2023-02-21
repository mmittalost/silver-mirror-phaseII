import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  paymentForm!:FormGroup;
  userInfoForm!: FormGroup;


  ngOnInit(): void {
    this._buildForm();    
  }

  constructor(private formBuilder:FormBuilder, private bookingService:SilverMirrorService){}

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
}
