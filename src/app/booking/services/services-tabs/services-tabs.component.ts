import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-services-tabs',
  templateUrl: './services-tabs.component.html',
  styleUrls: ['./services-tabs.component.scss']
})
export class ServicesTabsComponent {

  tab:string = 'facial';
  @Input() isAddonEnable:boolean = false;
  @Output() changeTabEvent = new EventEmitter<string>();

  constructor() {}

  changeTab(tab:string){
    if(tab != 'addon' || (tab=='addon' && this.isAddonEnable)){
      this.tab = tab;
    }
    this.changeTabEvent.emit(tab);
  }
}
