import { DOCUMENT } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
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
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.document.addEventListener('click', this.handleDocumentClick);

    this.authService.$AuthUser.subscribe((user)=>{
      if(user){
        this.user = user;
        setTimeout(() => {
          const UserPopupButton:any = document.querySelector('.menu-item-has-children');
          UserPopupButton.addEventListener('click', this.onclick.bind(this));
        }, 500);
      }
      user ? this.user = user : null;
    })
  }

  handleDocumentClick(event: any): void {
    // handle click event
    if (!event.target.closest('.user-pop') && !event.target.closest('.sign-in')) {
      console.log('clicked outside button');
      this.visible = false;
    }
    console.log('clicked', event.target, this.visible);
  }

  ngOnDestroy(): void {
    // remove click listener when component is destroyed
    this.document.removeEventListener('click', this.handleDocumentClick);
    this.document.removeEventListener('click', this.onclick);
  }

  constructor(@Inject(DOCUMENT) private document: Document,  public router: Router, public authService: AuthService ) {}

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
