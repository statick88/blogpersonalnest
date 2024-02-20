import { Comment } from '../comments/comment.model';

export interface Post {
  id: string;
  title: string;
  content: string;
  comments?: Comment[];
}
