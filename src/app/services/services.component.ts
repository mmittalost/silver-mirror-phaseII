import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  facialName = "1. Facials 30 Minutes";
  constructor(
    public silverService: SilverMirrorService
) { }
ngOnInit() {
  this.silverService.cartDetail()
}
}
