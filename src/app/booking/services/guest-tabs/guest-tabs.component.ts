import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-guest-tabs',
  templateUrl: './guest-tabs.component.html',
  styleUrls: ['./guest-tabs.component.scss']
})
export class GuestTabsComponent {

  @Input() guests:any;
  @Output() changeTabEvent = new EventEmitter<string>();
  tab='me';

  constructor(){
    setTimeout(() => {
        console.log(this.guests);
    }, 1000);
  }

  changeTab(tab:any){
    if(tab == 'me'){
      this.tab = 'me';
    }else{
      this.tab = tab.id
    }
    this.changeTabEvent.emit(tab);
  }

}
