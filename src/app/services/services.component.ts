import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  constructor(
    public silverService: SilverMirrorService
) { }
ngOnInit() {
  this.silverService.cartDetail()
}
}
