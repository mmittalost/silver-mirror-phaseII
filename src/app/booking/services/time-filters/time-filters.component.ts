import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.scss']
})
export class TimeFiltersComponent {

  tab:string= '30';
  @Input() reset:any
  @Output() changeTabEvent = new EventEmitter<string>();

  constructor(){}

  ngOnChanges(changes: SimpleChanges){
    console.log("reset Tabs : ", changes.reset)
    !changes.reset ? this.changeTab('30') : null;
    changes.reset && changes.reset.currentValue ? this.changeTab(changes.reset.currentValue) : null;
  }

  changeTab(tab:string){
    this.tab = tab;
    this.changeTabEvent.emit(tab);
  }

}
