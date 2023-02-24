import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.scss']
})
export class TimeFiltersComponent {

  tab:string= '30';
  @Output() changeTabEvent = new EventEmitter<string>();

  constructor(){}

  changeTab(tab:string){
    this.tab = tab;
    this.changeTabEvent.emit(tab);
  }

}
