import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-guest-tabs',
  templateUrl: './guest-tabs.component.html',
  styleUrls: ['./guest-tabs.component.scss']
})
export class GuestTabsComponent {

  @Input() guests:any;
  @Input() serviceCount:any = [];
  @Output() changeTabEvent = new EventEmitter<string>();
  tab='me';

  constructor(){
    // setTimeout(() => {
    //     console.log('guest tabs : ', this.guests, this.serviceCount);
    // }, 1000);
  }

  changeTab(tab:any){
    if(tab == 'me'){
      this.tab = 'me';
    }else{
      this.tab = tab.id
    }
    this.changeTabEvent.emit(tab);
  }

  getServiceCount(tabGuest:string){
    if(this.serviceCount.length){
      const count = this.serviceCount.filter((guest:any)=>{
        return tabGuest == guest.label;
      });
      return count.length ? count[0].addedServiceCount : 0;
    }else{
      return 0;
    }
  }

}
