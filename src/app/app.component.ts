import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'silver-mirror-phaseII';

  constructor(private notificationService:NotificationService) {
    // setTimeout(() => {
    //   this.notificationService.$notification.next({title:'Test Title', message:'Test Message!'});
    // }, 3000);
   }
  
  ngOnInit() { }
}
