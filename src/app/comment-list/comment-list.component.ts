import { Component, output } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user-service/user.interface';
import { Comment } from './comment.interface';

@Component({
  standalone: true,
  selector: 'comment-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  comments: Comment[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  commentText: string = '';
  addCommentForm: boolean = false;
  showUserList: boolean = false;
  startPosition: number = 0;
  onTagUser = output<User>();

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }

  // This function is called when the user types in the comment textarea.
  // We check for mentions and display a list of users that match the current mention.
  checkForMentions($event: any): void {
    const value = $event.target.value;
    const matches = value.match(/^(.*)(@\w+|@)$/);
    if (matches?.length > 0 && this.users.length > 0) {
      // We need start position to reconstruct textarea value later on.
      this.startPosition = matches[1]?.length;
      const currentMention = matches[2].split('@')[1];
      // Only show users that match the letters in the current mention.
      this.filteredUsers = this.users.filter(
        user => user.name.toLowerCase().includes(currentMention.toLowerCase())
      );
      // Careful to only sow the filtered user list if it is not empty.
      this.showUserList = this.filteredUsers?.length ? true : false;
    } else {
      // Hide the user list if there is no mention.
      // Sometimes the user might delete the @ symbol.
      this.showUserList = false;
    }
  }

  // This function is called when a user is selected from the list.
  addUserTag(user: User): void {
    this.showUserList = false;
    // When a user is selected, we rebuild the comment textarea value with the full username included. 
    this.commentText = this.commentText.substring(0, this.startPosition) + `@${user.name} `;
  }

  // This function is called when the user clicks the Add Comment button.
  // We save a new comment and emit an event to alert users mentioned.
  addComment(): void {
    if (this.commentText.trim() !== '') {
      // Find all mentioned users in the comment text.
      const matches = this.commentText.match(/@(\w+)/g);
      // Remove the @ symbol from the usernames .
      const userNames = matches?.map(match => match.substring(1));
      // Dedupe the mentions list so we don't alert users more than once.
      const dedupe: { [key: string]: boolean } = {};
      const mentionedUsers = this.users.filter(u => {
        if (dedupe[u.name]) {
          return false;
        }

        dedupe[u.name] = true;

        // userNames shouldn't get large enough to warrant a hash table.
        return userNames?.includes(u.name);
      });

      // Save the comment objects as comment text, timestamp and all mentioned users.
      const comment = {
        text: this.commentText,
        timestamp: (new Date()).toLocaleString(),
        mentions: mentionedUsers ? mentionedUsers : [],
      };

      // This would need to be a service call, but we are ignoring persistence for this exercise.
      this.comments.push(comment);

      if (comment.mentions.length > 0) {
        comment.mentions.forEach(mention => {
          // Allow app to handle the mention.
          // Since comments are not persisted, we don't pass a comment id.
          this.onTagUser.emit(mention);
        });
        
      }

      // Reset the comment textarea after a comment is added
      this.commentText = '';
    }

    // Hide the comment form after a comment is added
    this.addCommentForm = false;
  }
}