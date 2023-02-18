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
  noOfguest:any='1'
  constructor(private router:Router,public silverService: SilverMirrorService) {
    this.whosComingMe(localStorage.getItem('selectedWhoscoming'));
   }
   
  whosComingMe(selected:any){
    localStorage.setItem('selectedWhoscoming',selected);
    if(selected=='me')
    {
      this.statusMe = true; 
      this.statusMeandGuest  = false;
      this.statusMeandGuestDropdown  = false;
      this.btnStatus=true; 
     
    }
    else
    {
      this.statusMe = false;  
      this.statusMeandGuest  = true;
      this.statusMeandGuestDropdown  = true;
      this.btnStatus=true; 
      this.noOfguest=localStorage.getItem('noOfguestSelected');
      
    }
  }
 
 gotoServices()
  {
    this.silverService.cartDetail();
    this.silverService.removeGuest();
    this.silverService.noOfGuest=this.noOfguest;
  }
  guestChange(value:any){
    localStorage.setItem('noOfguestSelected',value)
  }
}
