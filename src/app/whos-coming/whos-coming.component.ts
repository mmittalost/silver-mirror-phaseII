import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-whos-coming',
  templateUrl: './whos-coming.component.html',
  styleUrls: ['./whos-coming.component.scss']
})
export class WhosComingComponent {

  statusMe: boolean = false;
  statusMeandGuest: boolean = false;
  statusMeandGuestDropdown:boolean=false
  btnStatus:boolean=false;
  guestCount:any='1';
  constructor(private router:Router,public silverService: SilverMirrorService) {
   }
  whosComingMe(meandg:any){
    this.statusMe = true;  
    this.statusMeandGuest  = false;
    this.statusMeandGuestDropdown  = false;
    this.btnStatus=true;
  }
  whosComingMeandGuest(meandg:any){
    this.statusMe = false;  
    this.statusMeandGuest  = true;
    this.statusMeandGuestDropdown  = true;
    this.btnStatus=true;
  }
  gotoServices()
  {
    this.silverService.noOfGuest=this.guestCount;
    this.router.navigate(['/services']);
  }
}
