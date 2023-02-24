import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SilverMirrorService } from "../../silver-mirror.service";
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
    public silverService: SilverMirrorService,
    private router: Router,
    private formBuilder:FormBuilder,
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
      alert('Invalid Email');
    }
  }

  checkOTP() {
    console.log(localStorage.getItem("otp"), this.enteredotp);
    if (localStorage.getItem("otp") == this.enteredotp) {
      localStorage.removeItem("otp");
      this.authService.$otp.next(null);
      this.router.navigateByUrl("/booking", { replaceUrl: true });
    } else {
      alert("OTP does not match!");
    }
  }
}
