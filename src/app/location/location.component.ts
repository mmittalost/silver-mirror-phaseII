import { Component } from '@angular/core';
import { SilverMirrorService } from '../silver-mirror.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  constructor(
    public silverService: SilverMirrorService
) { }
currentIndex: any;
expand(index: any) {
  if(this.currentIndex === index) {
    this.currentIndex = null;
    return;
  }
  this.currentIndex = index;
}
}
