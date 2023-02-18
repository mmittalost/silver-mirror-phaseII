import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent {
  route:any='';
  constructor(private router: Router) {
   this.route=this.router.url;
  }
completed(){
  
}

}
