import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email:any='';
  otp:any='';
  enteredotp:any='';
 
  constructor(public silverService: SilverMirrorService,private router: Router) {
   
   }
  generateOTP()
  {
    this.silverService.getClientByEmail(this.email);
  }
  checkOTP()
  {
    console.log(localStorage.getItem('otp') , this.enteredotp);    
    if (localStorage.getItem('otp') == this.enteredotp) {  
      this.silverService.loginStatus='true';    
      localStorage.setItem('loginStatus','true');
      this.router.navigate(['/location']);   
    }
      else {      
        localStorage.setItem('loginStatus','false');    
       }      
       
  }

}
