import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

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

  ngOnInit(): void {
    this.authService.$AuthUser.subscribe((user)=>{
      user ? this.user = user : null;
    })
  }

  constructor( public router: Router, public authService: AuthService ) {}

  logout() {
    localStorage.clear();
    this.authService.$AuthUser.next(null);
    this.router.navigateByUrl("/auth", {replaceUrl: true});
  }
  
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
  }
}
