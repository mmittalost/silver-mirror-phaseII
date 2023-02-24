import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-services-tabs',
  templateUrl: './services-tabs.component.html',
  styleUrls: ['./services-tabs.component.scss']
})
export class ServicesTabsComponent {

  tab:string = 'facial';
  @Output() changeTabEvent = new EventEmitter<string>();

  constructor() {}

  changeTab(tab:string){
    this.tab = tab;
    this.changeTabEvent.emit(tab);
  }
}
