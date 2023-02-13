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

}
