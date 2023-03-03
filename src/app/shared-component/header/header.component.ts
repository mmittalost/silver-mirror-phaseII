import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { SilverMirrorService } from "../../silver-mirror.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = "";

  ReadMore: boolean = true;
  visible: boolean = false;
  user:any;
  // loginStatus: boolean = false;

  ngOnInit(): void {

    this.authService.$AuthUser.subscribe((user)=>{
      user ? this.user = user : null;
      console.log(user);
    })

    // this.silverService.loginStatus.subscribe((status: string | null) => {
    //   console.log("Login Status : ", status, this.loginStatus);
    //   if (status && status != "") {
    //     this.loginStatus = true;
    //   } else {
    //     this.loginStatus = false;
    //   }
    // });
  }

  constructor(
    public silverService: SilverMirrorService,
    public router: Router,
    public authService: AuthService
  ) {}
  logout() {
    // this.silverService.loginStatus.next("false");
    // this.silverService.otp = "";
    localStorage.clear();
    this.authService.$AuthUser.next(null);
    this.router.navigateByUrl("/auth", {replaceUrl: true});
  }
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
  }
}
