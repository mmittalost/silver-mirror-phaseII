import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';

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
}
