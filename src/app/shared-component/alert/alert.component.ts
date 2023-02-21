import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SilverMirrorService } from '../../silver-mirror.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() message:string | undefined;
  

  constructor(public silverService: SilverMirrorService) { }
}
