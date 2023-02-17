import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(
    public silverService: SilverMirrorService
) { 

  
}

}
