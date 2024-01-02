import { UserI } from './user.interface';

export interface BlogEntry {
  id?: number;
  title?: string;
  slug?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  author?: UserI;
  headerImage?: string;
  publishedDate?: Date;
  isPublished?: boolean;
}
