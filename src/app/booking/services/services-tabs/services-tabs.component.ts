import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-services-tabs',
  templateUrl: './services-tabs.component.html',
  styleUrls: ['./services-tabs.component.scss']
})
export class ServicesTabsComponent {

  tab:string = 'facial';
  @Input() isAddonEnable:boolean = false;
  @Input() reset:any;
  @Output() changeTabEvent = new EventEmitter<string>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges){
    console.log("reset Tabs : ", changes.reset)
    // !changes.reset ? this.changeTab('facial') : null;
    changes.reset && changes.reset.currentValue?.event ? this.changeTab(changes.reset.currentValue.currentTab) : null;
  }

  changeTab(tab:string){
    if(tab != 'addon' || (tab=='addon' && this.isAddonEnable)){
      this.tab = tab;
    }
    this.changeTabEvent.emit(tab);
  }
}
