import { UserI } from "./user.interface";

export interface BlogEntry {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: UserI;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
}