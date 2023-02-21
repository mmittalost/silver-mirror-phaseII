import { Component } from "@angular/core";
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

  constructor(
    public authService: AuthService,
    public silverService: SilverMirrorService,
    private router: Router
  ) {}
  
  generateOTP() {
    this.authService.getClientByEmail(this.email);
  }

  checkOTP() {
    console.log(localStorage.getItem("otp"), this.enteredotp);
    if (localStorage.getItem("otp") == this.enteredotp) {
      localStorage.removeItem("otp");
      this.authService.$otp.next(null);
      this.router.navigateByUrl("/location", { replaceUrl: true });
    } else {
      alert("OTP does not match!");
    }
  }
}
