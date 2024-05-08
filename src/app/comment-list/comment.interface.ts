import { User } from "../user-service/user.interface";

export interface Comment {
  text: string;
  timestamp: string;
  mentions: User[];
}