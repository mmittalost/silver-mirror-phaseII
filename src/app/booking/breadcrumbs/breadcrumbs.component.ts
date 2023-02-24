import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent {
  
  steps=[
    {step:'location', transition: 1},
    {step:'whoscoming', transition: 1},
    {step:'services', transition: 1},
    {step:'schedule', transition: 1},
    {step:'review', transition: 1},
  ]
  route:any='';
  
  constructor(private router: ActivatedRoute) {
    this.route=this.router.url;
    router.url.subscribe((url=>{
      const path = url[0].path;
      console.log("Activated route : ", path);
      const index = this.steps.findIndex((step) => step.step == path);
      console.log("index of path = ", index);
      this.steps[index].transition = 3;
      for (let i = index-1; i >= 0; i--){
        this.steps[i].transition = 2;
      }
      console.log("Step and index : ", this.steps);
    }));
  }

  getRouteState(transition:number){
    switch (transition) {
      case 1:
        return ''
      case 2:
        return 'completed'
      case 3:
        return 'active'
      default:
        return ''
    }
  }

}
