import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedService } from "src/app/shared-component/shared.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email: any = "";
  otp: any = "";
  enteredotp: any = "";

  emailForm!:FormGroup;
  otpForm!:FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder:FormBuilder,
    private sharedService:SharedService,
    private _location: Location
  ) {
    this._buildForm();
    authService.$otp.subscribe((otp:string)=>{
      this.otp = otp;
    });
  }

  _buildForm(){
    this.emailForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
    this.otpForm = this.formBuilder.group({
      otp: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(6)])]
    });
  }
  
  generateOTP() {
    if(this.emailForm.valid){
      this.authService.getClientByEmail(this.email);
    }else{
      const title = 'Invalid Email';
      const message = 'Please enter a correct email address.';
      this.sharedService.showNotification(title, message);
    }
  }

  checkOTP() {
    if (localStorage.getItem("otp") == this.enteredotp) {
      localStorage.removeItem("otp");
      this.authService.$otp.next(null);
      this.router.navigateByUrl("/dashboard", {replaceUrl: true});
    } else {
      const title = 'Invalid OTP';
      const message = 'OTP does not match';
      this.sharedService.showNotification(title, message);
    }
  }
}
