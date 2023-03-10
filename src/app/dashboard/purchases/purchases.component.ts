import { Component } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent {

  activeTab = 1;

  changeTab(tab:number){
    this.activeTab = tab;
  }

}
