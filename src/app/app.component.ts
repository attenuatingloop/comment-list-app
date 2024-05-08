import { Component } from '@angular/core';
import { CommentListComponent } from './comment-list/comment-list.component';
import { User } from './user-service/user.interface';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  alertUser(mention: User): void {
    // Alert is for demonstration purposes only.
    alert(`User ${mention.name} has been tagged!`);
  }
}
