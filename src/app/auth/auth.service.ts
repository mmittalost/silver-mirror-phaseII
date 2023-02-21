import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";

const BASE_URL = "https://blvd.silvermirror.com";
// const CLIENT_ID = localStorage.getItem('clientID'); // himanshu.sharma@opensourcetechnologies.com
const CLIENT_ID = "0b9b1658-d8f2-4f3e-aabc-0574ef6a8af9"; // testost1@gmail.com

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public $AuthUser: BehaviorSubject<any> = new BehaviorSubject(null);
  public $otp: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
    const user:any = localStorage.getItem("AuthUser")
    this.$AuthUser.next(JSON.parse(user));
    this.$otp.next(localStorage.getItem("otp"));
  }

  getClientByEmail(email: any) {
    const payload = {
      emails: [email],
    };
    this.http
      .post(BASE_URL + "/get_client_by_email", payload)
      .subscribe((res: any) => {
        if (!res.erros) {
          const user = res.data.clients.edges[0].node;
          user.authId = user.id.replace("urn:blvd:Client:", "");
          localStorage.setItem("AuthUser", JSON.stringify(user));
          this.$AuthUser.next(user);
          const otp = Math.floor(Math.random() * 1000000 + 1).toString();
          this.$otp.next(otp);
          this.sendOTPEmail(user.email, otp, user.firstName);
        } else {
          alert("User does not exist!");
          this.router.navigate(["/register"]);
        }
      });
  }

  sendOTPEmail(email: any, otp: string, name: any) {
    const payload = {
      email: email,
      otp: otp,
      name: name,
    };
    this.http.post(BASE_URL + "/login", payload).subscribe((res: any) => {
      localStorage.setItem("otp", otp);
    });
  }

  addNewClient(data: any) {
    const payload = {
      client: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        mobilePhone: data.phone,
      },
    };
    this.http
      .post(BASE_URL + "/createClient", payload)
      .subscribe((res: any) => {
        console.log(">>", res);
      });
  }
}
