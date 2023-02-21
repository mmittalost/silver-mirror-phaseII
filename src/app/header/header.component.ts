import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title:string = '';
  
  ReadMore:boolean = true
  visible:boolean = false

  constructor(
    public silverService: SilverMirrorService,private router:Router
) { }
logout(){
  this.silverService.loginStatus=false;
  this.silverService.loginLogoutText='Sign In';
  this.silverService.otp='';
  localStorage.clear(); 
  this.router.navigate(['/login']);
 }
  onclick()
  {
    this.ReadMore = !this.ReadMore; 
    this.visible = !this.visible
  }
}
