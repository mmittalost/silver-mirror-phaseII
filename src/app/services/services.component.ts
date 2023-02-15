import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';
import { AlertComponent } from '../alert/alert.component';



@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  facialName = "Facials 30 Minutes";
  constructor(
    public silverService: SilverMirrorService
) { }
ngOnInit() {
  this.silverService.cartDetail()
}
serviceName(service:any){
 return service.replace('Facials ','')

}
createRange(){
  let noofguest=this.silverService.noOfGuest;
  console.log("noofguest",noofguest);
  return new Array(noofguest).fill(0)
    .map((n, index) => index + 1);
}
guestList(){
  this.silverService.guestList$.subscribe((res: any) => {
    console.log("mmm",res[0]);
    });
}


}